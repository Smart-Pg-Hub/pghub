# Smart PG Chatbot Microservice (Python + FastAPI + GenAI)

A standalone Python microservice that adds a GenAI-powered chatbot to your
Smart PG Management System. Your existing Java/Spring Boot app calls this
service over REST using `RestTemplate` — no changes needed to your main
backend's language or architecture.

## How it works

- **Hybrid design**: common questions (rent due, room availability, filing a
  complaint) are answered directly from your PG data via rule-based intent
  matching — so numbers are always accurate, never hallucinated.
- Anything else (general questions, small talk, house-rule queries) falls
  back to a GenAI call (OpenAI or Anthropic) with a PG-assistant system
  prompt, so replies stay on-topic.
- Conversation history is kept per `sessionId` so the bot has short-term
  memory across a chat.

```
smart_pg_chatbot/
├── main.py              # FastAPI app + REST endpoints
├── chatbot_service.py   # Intent detection + GenAI fallback logic
├── knowledge_base.py    # Mock PG data — replace with real DB/API calls
├── models.py             # Request/response schemas
├── requirements.txt
├── Dockerfile
└── .env.example
```

## 1. Setup

```bash
cd smart_pg_chatbot
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate
pip install -r requirements.txt

cp .env.example .env
# edit .env: set LLM_PROVIDER and the matching API key
```

## 2. Run locally

```bash
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

Visit `http://localhost:8000/docs` for interactive Swagger UI.

## 3. Run with Docker

```bash
docker build -t smart-pg-chatbot .
docker run -p 8000:8000 --env-file .env smart-pg-chatbot
```

## 4. API

**POST** `/api/v1/chat`

Request:
```json
{
  "userId": "U1001",
  "message": "What is my rent due?",
  "sessionId": null
}
```

Response:
```json
{
  "sessionId": "d0e4e4d9-...",
  "reply": "Your pending rent is ₹6500 due by 2026-08-15.",
  "intent": "RENT_STATUS",
  "suggestedActions": ["Pay Rent", "Contact Admin"]
}
```

**GET** `/health` → `{"status": "UP", "service": "smart-pg-chatbot"}`

## 5. Calling it from Spring Boot with RestTemplate

```java
public class ChatRequest {
    private String userId;
    private String message;
    private String sessionId;
    // getters/setters/constructors
}

public class ChatResponse {
    private String sessionId;
    private String reply;
    private String intent;
    private List<String> suggestedActions;
    // getters/setters
}

@Service
public class ChatbotClient {

    private final RestTemplate restTemplate = new RestTemplate();

    @Value("${chatbot.service.url}")
    private String chatbotServiceUrl; // e.g. http://localhost:8000/api/v1/chat

    public ChatResponse sendMessage(String userId, String message, String sessionId) {
        ChatRequest request = new ChatRequest(userId, message, sessionId);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<ChatRequest> entity = new HttpEntity<>(request, headers);

        ResponseEntity<ChatResponse> response = restTemplate.exchange(
                chatbotServiceUrl,
                HttpMethod.POST,
                entity,
                ChatResponse.class
        );

        return response.getBody();
    }
}
```

Add to `application.properties`:
```properties
chatbot.service.url=http://localhost:8000/api/v1/chat
```

## 6. Wiring in your real PG data

Right now `knowledge_base.py` uses mock in-memory data. Swap each function
(`get_rent_status`, `get_available_rooms`, `file_complaint`, etc.) to either:
- call your existing Spring Boot REST APIs with the `requests`/`httpx`
  library, or
- connect directly to your PG database (e.g. via SQLAlchemy).

This keeps the chatbot's factual answers (rent, rooms, complaints) always
in sync with your source of truth, while the LLM only handles the
conversational/open-ended parts.

## 7. Production notes

- Replace the in-memory `_SESSIONS` dict in `chatbot_service.py` with Redis
  or a DB table so history survives restarts and works across multiple
  instances behind a load balancer.
- Restrict CORS `allow_origins` in `main.py` to your actual frontend/backend
  origin instead of `"*"`.
- Add authentication (e.g. a shared API key or JWT check) on `/api/v1/chat`
  so only your Spring Boot backend can call it.
- Set request timeouts and rate limits since LLM calls can be slow.
