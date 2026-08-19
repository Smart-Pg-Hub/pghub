

package com.backend.controller;
 
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
 
import com.backend.dto.req.ChatReq;
import com.backend.service.ChatbotService;
 
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
 
@RestController
@RequestMapping("/chat")
@RequiredArgsConstructor
public class ChatController {
 
	private final ChatbotService chatbotService;
 
	@PostMapping
	public ResponseEntity<?> chat(@Valid @RequestBody ChatReq request, Authentication authentication) {
		Long userId = (Long) authentication.getPrincipal();
		String role = authentication.getAuthorities().iterator().next().getAuthority();
 
		return ResponseEntity.ok(chatbotService.chat(userId, role, request));
	}
}
 
