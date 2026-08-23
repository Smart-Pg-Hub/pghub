package com.backend.dto.response;

import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChatResp {

	private String sessionId;
	private String reply;
	private String intent;          // e.g. RENT_STATUS, COMPLAINT_STATUS, GENERAL
	private List<String> suggestedActions;

	public ChatResp() {}

	public ChatResp(String sessionId, String reply, String intent, List<String> suggestedActions) {
		this.sessionId = sessionId;
		this.reply = reply;
		this.intent = intent;
		this.suggestedActions = suggestedActions;
	}
}