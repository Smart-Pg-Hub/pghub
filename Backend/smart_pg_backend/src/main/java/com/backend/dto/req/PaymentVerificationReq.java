package com.backend.dto.req;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PaymentVerificationReq {

	private String razorpayOrderId;

	private String razorpayPaymentId;

	private String razorpaySignature;

}
