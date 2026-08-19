package com.backend.dto.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PaymentVerificationResponse {
	
    private String message;
    private String paymentStatus;
    private String razorpayOrderId;
    private String razorpayPaymentId;
	

}
