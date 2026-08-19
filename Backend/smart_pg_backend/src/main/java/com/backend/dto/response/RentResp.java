package com.backend.dto.response;

import java.time.LocalDate;

import com.backend.enums.RentStatus;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RentResp {
	
	    private Long rentId;
	    private Long tenantId;
	    private String tenantName;
	    private Long bookingId;
	    private String roomNumber;
	    private String propertyName;
	    private Long amount;
	    private LocalDate rentMonth;
	    private LocalDate dueDate;
	    private RentStatus status;
	    private LocalDate paymentDate;

}
