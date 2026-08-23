package com.backend.dto.req;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@RequiredArgsConstructor
public class ChatReq {

	@NotBlank(message = "Message is required")
	private String message;

	private String sessionId; // optional, null on first message of a conversation
}