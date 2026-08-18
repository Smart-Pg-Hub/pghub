package com.backend.dto.response;

import java.time.LocalDate;

import com.backend.enums.ComplaintStatus;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@RequiredArgsConstructor
public class ComplaintsResp {
	
	 private Long complaintId;

	    private Long bookingId;

	    private String tenantName;

	    private String roomNumber;

	    private String propertyName;

	    private String subject;

	    private String description;

	    private ComplaintStatus status;

	    private LocalDate createdDate;

	    private LocalDate resolvedDate;

}
