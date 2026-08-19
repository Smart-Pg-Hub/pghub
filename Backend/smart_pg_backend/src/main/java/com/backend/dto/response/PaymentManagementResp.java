package com.backend.dto.response;

import java.time.LocalDate;

import com.backend.enums.PaymentMethod;
import com.backend.enums.PaymentStatus;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter 
@Setter
@AllArgsConstructor
public class PaymentManagementResp {

	    private Long paymentId;

	    private Long bookingId;

	    private String tenantName;

	    private String tenantPhone;

	    private String propertyName;

	    private String roomNumber;

	    private Long monthlyRent;

	    private LocalDate dueDate;

	    private LocalDate paymentDate;

	    private PaymentStatus paymentStatus;

	    private PaymentMethod paymentMethod;
	}
