package com.backend.dto.req;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@RequiredArgsConstructor
public class ComplaintsReq {
	
	   @NotNull(message = "Booking id is required")
	    private Long bookingId;

	    @NotBlank(message = "Subject is required")
	    private String subject;

	    @NotBlank(message = "Description is required")
	    private String description;

}
