package com.backend.serviceIpl;

import java.util.List;
import java.util.UUID;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.backend.chatbot.ChatbotClient;
import com.backend.chatbot.ChatbotClient.PythonChatResponse;
import com.backend.dto.req.ChatReq;
import com.backend.dto.response.ChatResp;
import com.backend.dto.response.ComplaintsResp;
import com.backend.dto.response.RentResp;
import com.backend.enums.RentStatus;
import com.backend.service.ChatbotService;
import com.backend.service.ComplaintsService;
import com.backend.service.RentService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ChatbotServiceIml implements ChatbotService {

    private final RentService rentService;
    private final ComplaintsService complaintsService;
    private final ChatbotClient chatbotClient;

    private static final Pattern RENT_PATTERN =
            Pattern.compile("(?i)\\b(rent|due|payment)\\b");

    private static final Pattern COMPLAINT_PATTERN =
            Pattern.compile("(?i)\\b(complaint|complaints|issue|ticket)\\b");

    @Override
    public ChatResp chat(Long userId, String role, ChatReq request) {

        String message = request.getMessage();

        String sessionId = request.getSessionId() != null
                ? request.getSessionId()
                : UUID.randomUUID().toString();

        // Tenant rent-related questions
        if ("TENANT".equalsIgnoreCase(role)
                && RENT_PATTERN.matcher(message).find()) {

            return handleRentStatus(userId, sessionId);
        }

        // Tenant complaint-related questions
        if ("TENANT".equalsIgnoreCase(role)
                && COMPLAINT_PATTERN.matcher(message).find()) {

            return handleComplaintStatus(userId, sessionId);
        }

        // Everything else goes to the GenAI microservice
        PythonChatResponse aiResponse = chatbotClient.ask(
                String.valueOf(userId),
                message,
                sessionId
        );

        // Preserve the response from FastAPI
        return new ChatResp(
                aiResponse.getSessionId(),
                aiResponse.getReply(),
                aiResponse.getIntent(),
                aiResponse.getSuggestedActions()
        );
    }

    private ChatResp handleRentStatus(Long tenantId, String sessionId) {

        List<RentResp> rents = rentService.getTenantRents(tenantId);

        List<RentResp> pending = rents.stream()
                .filter(r ->
                        r.getStatus() == RentStatus.PENDING
                        || r.getStatus() == RentStatus.LATE
                )
                .collect(Collectors.toList());

        String reply;

        if (pending.isEmpty()) {

            reply = "You're all caught up - no pending rent right now.";

        } else {

            String lines = pending.stream()
                    .map(r -> String.format(
                            "- %s: ₹%d due by %s (%s)",
                            r.getPropertyName() != null
                                    ? r.getPropertyName()
                                    : "your room",
                            r.getAmount(),
                            r.getDueDate(),
                            r.getStatus()
                    ))
                    .collect(Collectors.joining("\n"));

            reply = "Here's your pending rent:\n" + lines;
        }

        return new ChatResp(
                sessionId,
                reply,
                "RENT_STATUS",
                pending.isEmpty()
                        ? null
                        : List.of("Pay Rent")
        );
    }

    private ChatResp handleComplaintStatus(
            Long tenantId,
            String sessionId) {

        List<ComplaintsResp> complaints =
                complaintsService.getComplaints(tenantId);

        String reply;

        if (complaints.isEmpty()) {

            reply =
                    "You have no complaints on record. Want to raise one?";

        } else {

            String lines = complaints.stream()
                    .map(c -> String.format(
                            "- #%d %s: %s",
                            c.getComplaintId(),
                            c.getSubject(),
                            c.getStatus()
                    ))
                    .collect(Collectors.joining("\n"));

            reply = "Here are your complaints:\n" + lines;
        }

        return new ChatResp(
                sessionId,
                reply,
                "COMPLAINT_STATUS",
                List.of("Raise a Complaint")
        );
    }
}