import logging
from dotenv import load_dotenv

load_dotenv()


from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from models import ChatRequest, ChatResponse, HealthResponse
from chatbot_service import ChatbotService

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("smart-pg-chatbot")

app = FastAPI(
    title="Smart PG Chatbot Microservice",
    description="GenAI powered chatbot microservice for the Smart PG Management System",
    version="1.0.0",
)

# Allow your Spring Boot backend (and anything else) to call this service.
# In production, replace "*" with your actual backend's origin.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

chatbot_service = ChatbotService()


@app.get("/health", response_model=HealthResponse)
def health_check():
    return HealthResponse(status="UP", service="smart-pg-chatbot")


@app.post("/api/v1/chat", response_model=ChatResponse)
def chat(request: ChatRequest):
    """
    Called from Spring Boot like:

        RestTemplate restTemplate = new RestTemplate();
        String url = "http://localhost:8000/api/v1/chat";

        ChatRequest req = new ChatRequest(userId, message, sessionId);
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<ChatRequest> entity = new HttpEntity<>(req, headers);

        ChatResponse response = restTemplate.postForObject(url, entity, ChatResponse.class);
    """
    try:
        return chatbot_service.get_response(
            user_id=request.userId,
            message=request.message,
            session_id=request.sessionId,
        )
    except Exception as e:
        logger.exception("Error while generating chatbot response")
        raise HTTPException(status_code=500, detail=str(e))


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
