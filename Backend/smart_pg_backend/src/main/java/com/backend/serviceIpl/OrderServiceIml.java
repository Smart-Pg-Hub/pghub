package com.backend.serviceIpl;

import java.time.LocalDateTime;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.backend.dto.response.CreateOrderResponse;
import com.backend.dto.req.PaymentVerificationReq;
import com.backend.dto.response.PaymentVerificationResponse;
import com.backend.entity.Booking;
import com.backend.entity.PaymentTransaction;
import com.backend.entity.Rent;
import com.backend.entity.Tenant;
import com.backend.enums.OrderStatus;
import com.backend.enums.PaymentStatus;
import com.backend.enums.PaymentType;
import com.backend.repository.BookingRepository;
import com.backend.repository.OrderRepository;
import com.backend.repository.RentRepository;
import com.backend.repository.TenantRepository;
import com.backend.service.OrderService;

import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;

import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;

import jakarta.annotation.PostConstruct;

@Service
@Transactional
@RequiredArgsConstructor
public class OrderServiceIml implements OrderService {
	private final OrderRepository orderRepo;

	@Value("${razorpay.key.id}")
	private String razorpayId;

	@Value("${reazorpay.key.secret}")
	private String razorpaySecret;

	private RazorpayClient razorpayClient;

	private final TenantRepository tenantRepo;
	private final BookingRepository bookingRepo;

	@PostConstruct
	public void init() {
		try {
			this.razorpayClient = new RazorpayClient(razorpayId, razorpaySecret);
		} catch (RazorpayException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	} 

	@Override
	public CreateOrderResponse  createOrders(PaymentTransaction order, Long tenantId) throws RazorpayException {

	    Tenant tenant = tenantRepo.findById(tenantId).orElseThrow(() -> new RuntimeException("Tenant not found"));
         
	    PaymentTransaction payment = new PaymentTransaction();
	    payment.setTenant(tenant);
	   
	    payment.setAmount(order.getAmount());
	    payment.setPaymentType(order.getPaymentType());
	    payment.setBooking(order.getBooking());
	    
	    payment.setPaymentStatus(PaymentStatus.CREATED);

	    JSONObject json = new JSONObject();
	    json.put("amount", order.getAmount() * 100);
	    json.put("currency", "INR");
	    json.put("receipt", "RENT_PENDING_" + System.currentTimeMillis());

	    Order razorpayOrder = razorpayClient.orders.create(json);
	    String razorpayOrderId = razorpayOrder.get("id");

	    payment.setRazorpayOrderId(razorpayOrderId);
	    

	     orderRepo.save(payment); 
	     
	     CreateOrderResponse response = new CreateOrderResponse();

	     response.setOrderId(razorpayOrder.get("id"));
	     response.setAmount(razorpayOrder.get("amount"));
	     response.setCurrency(razorpayOrder.get("currency"));
	     response.setReceipt(razorpayOrder.get("receipt"));
	     response.setStatus(razorpayOrder.get("status"));

	     return response;
	}
	

	private String generateSignature(String orderId, String paymentId) {
		try {
			String data = orderId + "|" + paymentId;
			Mac mac = Mac.getInstance("HmacSHA256");
			SecretKeySpec secretKey = new SecretKeySpec(razorpaySecret.getBytes(), "HmacSHA256");
			mac.init(secretKey);
			byte[] hash = mac.doFinal(data.getBytes());
			StringBuilder hex = new StringBuilder();
			for (byte b : hash) {
				hex.append(String.format("%02x", b));
			}
			return hex.toString();
		} catch (Exception e) {
			throw new RuntimeException("Signature generation failed");
		}
	}

	@Override
	public PaymentVerificationResponse verifyPayment(PaymentVerificationReq request) {
		PaymentTransaction payment = orderRepo.findByRazorpayOrderId(request.getRazorpayOrderId())
				.orElseThrow(() -> new RuntimeException("Payment not found"));
		String generatedSignature = generateSignature(request.getRazorpayOrderId(), request.getRazorpayPaymentId());
		if (!generatedSignature.equals(request.getRazorpaySignature())) {
			payment.setPaymentStatus(PaymentStatus.FAILED);
			orderRepo.save(payment);
			throw new RuntimeException("Invalid payment signature");
		}
		payment.setRazorpayPaymentId(request.getRazorpayPaymentId());
		payment.setRazorpaySignature(request.getRazorpaySignature());
		payment.setPaymentStatus(PaymentStatus.PAID);

		payment.setPaymentDate(LocalDateTime.now());
		 orderRepo.save(payment);
		 
		 PaymentVerificationResponse response = new PaymentVerificationResponse();

		 response.setMessage("Payment Verified Successfully");
		 response.setPaymentStatus(payment.getPaymentStatus().name());
		 response.setRazorpayOrderId(payment.getRazorpayOrderId());
		 response.setRazorpayPaymentId(payment.getRazorpayPaymentId());

		 return response;
	}

} 
