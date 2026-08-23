package com.backend.entity;

import java.time.LocalDate;
import java.time.LocalDateTime;

import com.backend.enums.OrderStatus;
import com.backend.enums.PaymentMethod;
import com.backend.enums.PaymentStatus;
import com.backend.enums.PaymentType;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class PaymentTransaction {
	
	  @Id 
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    @Column(name = "payment_id")
	    private Long id;

	    // BOOKING / MONTHLY_RENT / REFUND
	    @Enumerated(EnumType.STRING)
	    @Column(name = "payment_type", nullable = false)
	    private PaymentType paymentType;

	    // Booking Payment
	    @ManyToOne
	    @JoinColumn(name = "booking_id")
	    private Booking booking;
	    @ManyToOne
	    @JoinColumn(name = "tenant_id", nullable = false)
	    private Tenant tenant;

	    @Column(nullable = false)
	    private Long amount;

	    @Column(length = 10)
	    private String currency = "INR";

	    @Enumerated(EnumType.STRING)
	    @Column(name = "payment_method")
	    private PaymentMethod paymentMethod;

	    @Enumerated(EnumType.STRING)
	    @Column(nullable = false)
	    private PaymentStatus paymentStatus;

	    @Column(name = "razorpay_order_id", unique = true)
	    private String razorpayOrderId;

	    @Column(name = "razorpay_payment_id")
	    private String razorpayPaymentId;

	    @Column(name = "razorpay_signature", length = 500)
	    private String razorpaySignature;
	    
	    private LocalDate paymentMonth;

	    @Column(name = "payment_date")
	    private LocalDateTime paymentDate;

	    @Column(name = "created_at", nullable = false, updatable = false)
	    private LocalDateTime createdAt;

	    @PrePersist
	    public void onCreate() {
	        createdAt = LocalDateTime.now();
	    }
}
