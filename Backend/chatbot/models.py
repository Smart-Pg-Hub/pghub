from pydantic import BaseModel, Field
from typing import Optional, List


class ChatRequest(BaseModel):
    """
    Matches the JSON body your Spring Boot RestTemplate call will POST.
    Example Java DTO:

        public class ChatRequest {
            private String userId;
            private String message;
            private String sessionId;
        }
    """
    userId: str = Field(..., description="ID of the tenant/user chatting")
    message: str = Field(..., description="User's chat message")
    sessionId: Optional[str] = Field(None, description="Conversation session id (optional, auto-created if missing)")


class ChatResponse(BaseModel):
    sessionId: str
    reply: str
    intent: Optional[str] = None
    suggestedActions: Optional[List[str]] = None


class HealthResponse(BaseModel):
    status: str
    service: str
