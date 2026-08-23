package com.backend.chatbot;

import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * Calls the standalone Python (FastAPI) GenAI microservice for open-ended chat
 * replies. Real, factual PG data (rent, complaints) is handled entirely in Java
 * before this is ever called - this client is only for the conversational /
 * general-question fallback, and for turning raw facts into a natural-sounding
 * sentence when we want the LLM to phrase them.
 */
@Component
@RequiredArgsConstructor
@Slf4j
public class ChatbotClient {

	private final RestTemplate restTemplate;

	@Value("${chatbot.service.url}")
	private String chatbotServiceUrl; // e.g. http://localhost:8000/api/v1/chat

	public PythonChatResponse ask(String userId, String message, String sessionId) {
		PythonChatRequest request = new PythonChatRequest(userId, message, sessionId);
		try {
			return restTemplate.postForObject(chatbotServiceUrl, request, PythonChatResponse.class);
		} catch (Exception e) {
			log.error("Failed to reach Python chatbot microservice", e);
			PythonChatResponse fallback = new PythonChatResponse();
			fallback.setSessionId(sessionId);
			fallback.setReply("Sorry, I'm having trouble answering that right now. Please try again shortly.");
			return fallback;
		}
	}

	// ---- Internal DTOs matching the Python service's models.py exactly ----

	public static class PythonChatRequest {
		public String userId;
		public String message;
		public String sessionId;

		public PythonChatRequest(String userId, String message, String sessionId) {
			this.userId = userId;
			this.message = message;
			this.sessionId = sessionId;
		}
	}

	public static class PythonChatResponse {
		private String sessionId;
		private String reply;
		private String intent;

		public String getSessionId() {
			return sessionId;
		}

		public void setSessionId(String sessionId) {
			this.sessionId = sessionId;
		}

		public String getReply() {
			return reply;
		}

		public void setReply(String reply) {
			this.reply = reply;
		}

		public String getIntent() {
			return intent;
		}

		public void setIntent(String intent) {
			this.intent = intent;
		}

		private List<String> suggestedActions;

		public List<String> getSuggestedActions() {
			return suggestedActions;
		}

		public void setSuggestedActions(List<String> suggestedActions) {

			this.suggestedActions = suggestedActions;
		}
	}
}