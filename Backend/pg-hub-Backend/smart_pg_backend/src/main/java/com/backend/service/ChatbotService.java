package com.backend.service;

import com.backend.dto.req.ChatReq;
import com.backend.dto.response.ChatResp;

public interface ChatbotService {

	ChatResp chat(Long userId, String role, ChatReq request);
}