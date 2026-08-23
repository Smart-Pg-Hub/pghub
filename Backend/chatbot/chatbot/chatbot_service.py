import os
import uuid
import logging
from typing import Dict, List

import httpx
from models import ChatResponse
from dotenv import load_dotenv

load_dotenv()

logger = logging.getLogger("smart-pg-chatbot")


# =========================================================
# CONFIGURATION
# =========================================================

LLM_PROVIDER = os.getenv("LLM_PROVIDER", "gemini")

MODEL_NAME = os.getenv(
    "LLM_MODEL",
    "gemini-3.6-flash"
)

PG_SERVICE_URL = os.getenv(
    "PG_SERVICE_URL",
    "http://localhost:8081/api/pgs"
)


# =========================================================
# SYSTEM PROMPT
# =========================================================

SYSTEM_PROMPT = """
You are 'PG Assistant', a helpful chatbot for the Smart PG
Management System (PGHub).

You can answer general questions about PGHub, PG rules, amenities,
tenants, owners, bookings and the platform.

When PG listing data is provided to you from the PG Service, use that
data to answer the user's question.

Never claim that you cannot access PG listings when listing data has
been provided.

Never invent PG names, locations, prices, rooms, amenities,
availability, contact information or any other information.

Only use information provided in the PG data.

Be concise, friendly and professional.

When listing PGs, make sure every Markdown bold section is properly
closed. Never leave incomplete Markdown such as **.
"""


# =========================================================
# SESSION STORAGE
# =========================================================

_SESSIONS: Dict[str, List[Dict[str, str]]] = {}


# =========================================================
# CHATBOT SERVICE
# =========================================================

class ChatbotService:

    # =====================================================
    # MAIN RESPONSE METHOD
    # =====================================================

    def get_response(
        self,
        user_id: str,
        message: str,
        session_id: str = None
    ) -> ChatResponse:

        session_id = session_id or str(uuid.uuid4())

        history = _SESSIONS.setdefault(
            session_id,
            []
        )

        # -------------------------------------------------
        # 1. Detect PG search request
        # -------------------------------------------------

        if self._is_pg_search(message):

            logger.info(
                "PG search detected for user=%s message=%s",
                user_id,
                message
            )

            pg_data = self._get_pg_data()

            if pg_data is not None:

                reply = self._generate_pg_response(
                    history,
                    message,
                    pg_data
                )

                intent = "SEARCH_PG"

                # Save conversation history
                history.append({
                    "role": "user",
                    "content": message
                })

                history.append({
                    "role": "assistant",
                    "content": reply
                })

                return ChatResponse(
                    sessionId=session_id,
                    reply=reply,
                    intent=intent,
                    suggestedActions=None
                )

            # -------------------------------------------------
            # PG service unavailable
            # -------------------------------------------------

            return ChatResponse(
                sessionId=session_id,
                reply=(
                    "I'm unable to access the PG listings right now. "
                    "Please try again shortly."
                ),
                intent="SEARCH_PG",
                suggestedActions=None
            )

        # -------------------------------------------------
        # 2. General question → LLM
        # -------------------------------------------------

        reply = self._call_llm(
            history,
            message
        )

        history.append({
            "role": "user",
            "content": message
        })

        history.append({
            "role": "assistant",
            "content": reply
        })

        return ChatResponse(
            sessionId=session_id,
            reply=reply,
            intent="GENERAL",
            suggestedActions=None
        )

    # =========================================================
    # PG SEARCH DETECTION
    # =========================================================

    def _is_pg_search(
        self,
        message: str
    ) -> bool:

        text = message.lower()

        keywords = [
            "show pg",
            "show pgs",
            "find pg",
            "find pgs",
            "search pg",
            "search pgs",
            "available pg",
            "available pgs",
            "pg in",
            "pgs in",
            "pg near",
            "pgs near",
            "looking for pg",
            "looking for a pg",
            "hostel in",
            "hostels in"
        ]

        return any(
            keyword in text
            for keyword in keywords
        )

    # =========================================================
    # CALL SPRING BOOT PG SERVICE
    # =========================================================

    def _get_pg_data(self):

        try:

            logger.info(
                "Calling PG Service: %s",
                PG_SERVICE_URL
            )

            response = httpx.get(
                PG_SERVICE_URL,
                timeout=10.0
            )

            response.raise_for_status()

            data = response.json()

            logger.info(
                "Received PG data from PG Service"
            )

            return data

        except Exception:

            logger.exception(
                "Unable to fetch PG data from PG Service"
            )

            return None

    # =========================================================
    # GENERATE PG RESPONSE
    # =========================================================

    def _generate_pg_response(
        self,
        history,
        message,
        pg_data
    ):

        prompt = f"""
User request:
{message}

PG listings retrieved from the Smart PG backend:

{pg_data}

Answer the user's question using ONLY the PG data above.

IMPORTANT RULES:

1. List the relevant PGs clearly.

2. For every PG, include only information that exists
   in the supplied PG data.

3. Never invent:
   - PG names
   - prices
   - locations
   - areas
   - room counts
   - amenities
   - phone numbers
   - availability
   - PG types
   - owners
   - any other information

4. If a field is missing from the PG data, simply don't mention it.

5. If the user asks for PGs, use this format:

1. **PG Name**
   - Location: ...
   - Area: ...
   - Type: ...
   - Rooms: ...
   - Amenities: ...
   - Contact: ...

2. **Another PG Name**
   - Location: ...
   - Area: ...
   - Type: ...
   - Rooms: ...
   - Amenities: ...
   - Contact: ...

6. Only include fields that actually exist in the data.

7. If multiple PGs match the request, list all relevant matches.

8. Do not stop in the middle of a PG listing.

9. Do not leave incomplete Markdown.
   For example, never output:
   1. **
   
   Always close bold text properly:
   1. **PG Name**

10. Do not say that you cannot access PG listings because
    the PG Service data has already been provided.

11. Keep the response concise but complete.

12. If there are no matching PGs, clearly say that no matching
    PGs were found.

Now answer the user's request.
"""

        return self._call_gemini(
            history,
            prompt
        )

    # =========================================================
    # GENERAL LLM ROUTER
    # =========================================================

    def _call_llm(
        self,
        history,
        message
    ):

        try:

            if LLM_PROVIDER == "anthropic":

                return self._call_anthropic(
                    history,
                    message
                )

            if LLM_PROVIDER == "gemini":

                return self._call_gemini(
                    history,
                    message
                )

            return self._call_openai(
                history,
                message
            )

        except Exception:

            logger.exception(
                "LLM call failed"
            )

            return (
                "Sorry, I'm having trouble answering that right now. "
                "Please try again shortly or contact the PG admin directly."
            )

    # =========================================================
    # GEMINI
    # =========================================================

    def _call_gemini(
        self,
        history,
        message
    ):

        from google import genai

        client = genai.Client(
            api_key=os.environ["GEMINI_API_KEY"]
        )

        contents = []

        # -----------------------------------------------------
        # Add conversation history
        # -----------------------------------------------------

        for turn in history[-10:]:

            role = (
                "model"
                if turn["role"] == "assistant"
                else "user"
            )

            contents.append({
                "role": role,
                "parts": [
                    {
                        "text": turn["content"]
                    }
                ]
            })

        # -----------------------------------------------------
        # Add current message
        # -----------------------------------------------------

        contents.append({
            "role": "user",
            "parts": [
                {
                    "text": message
                }
            ]
        })

        # -----------------------------------------------------
        # Call Gemini
        # -----------------------------------------------------

        response = client.models.generate_content(
            model=MODEL_NAME,
            contents=contents,
            config={
                "system_instruction": SYSTEM_PROMPT,
                "max_output_tokens": 1500,
                "temperature": 0.3
            }
        )

        # -----------------------------------------------------
        # Safely get response text
        # -----------------------------------------------------

        if not response.text:

            logger.warning(
                "Gemini returned an empty response"
            )

            return (
                "Sorry, I couldn't generate a response right now."
            )

        return response.text.strip()

    # =========================================================
    # OPENAI
    # =========================================================

    def _call_openai(
        self,
        history,
        message
    ):

        from openai import OpenAI

        client = OpenAI(
            api_key=os.environ["OPENAI_API_KEY"]
        )

        messages = [
            {
                "role": "system",
                "content": SYSTEM_PROMPT
            }
        ]

        messages.extend(
            history[-10:]
        )

        messages.append({
            "role": "user",
            "content": message
        })

        completion = client.chat.completions.create(
            model=os.getenv(
                "LLM_MODEL",
                "gpt-4o-mini"
            ),
            messages=messages,
            max_tokens=1500,
            temperature=0.3
        )

        content = completion.choices[0].message.content

        if not content:

            return (
                "Sorry, I couldn't generate a response right now."
            )

        return content.strip()

    # =========================================================
    # ANTHROPIC
    # =========================================================

    def _call_anthropic(
        self,
        history,
        message
    ):

        import anthropic

        client = anthropic.Anthropic(
            api_key=os.environ["ANTHROPIC_API_KEY"]
        )

        messages = list(
            history[-10:]
        )

        messages.append({
            "role": "user",
            "content": message
        })

        resp = client.messages.create(
            model=os.getenv(
                "LLM_MODEL",
                "claude-sonnet-4-6"
            ),
            max_tokens=1500,
            system=SYSTEM_PROMPT,
            messages=messages
        )

        return "".join(
            block.text
            for block in resp.content
            if block.type == "text"
        ).strip()