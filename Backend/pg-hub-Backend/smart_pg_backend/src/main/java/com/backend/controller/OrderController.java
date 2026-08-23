package com.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.dto.req.PaymentVerificationReq;
import com.backend.entity.PaymentTransaction;
import com.backend.service.OrderService;
import com.razorpay.RazorpayException;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/payment")
@AllArgsConstructor
public class OrderController {
	private final OrderService orderService;
 
	@PostMapping("/create-order")
	public ResponseEntity<?> createOrder(@RequestBody PaymentTransaction paymentTransaction,Authentication authentication) throws RazorpayException {
	
		Long tenantId = (Long) authentication.getPrincipal();
		return ResponseEntity.ok(orderService.createOrders(paymentTransaction,tenantId));

	} 
	
	@PostMapping("/verify")
	public ResponseEntity<?> verifyPayment( @RequestBody PaymentVerificationReq request) {

	    return ResponseEntity.ok( orderService.verifyPayment(request));
	}

} 
  