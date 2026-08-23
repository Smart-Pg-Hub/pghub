package com.backend.service;

import com.backend.dto.response.CreateOrderResponse;
import com.backend.dto.req.PaymentVerificationReq;
import com.backend.dto.response.PaymentVerificationResponse;
import com.backend.entity.PaymentTransaction;
import com.razorpay.RazorpayException;

import lombok.Value;

public interface OrderService {
	
	public CreateOrderResponse  createOrders(PaymentTransaction order,Long tenantId) throws RazorpayException;
	PaymentVerificationResponse verifyPayment( PaymentVerificationReq request);
	
}
 