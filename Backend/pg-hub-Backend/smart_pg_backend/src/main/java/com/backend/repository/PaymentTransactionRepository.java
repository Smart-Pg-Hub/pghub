package com.backend.repository;

import java.math.BigDecimal;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.backend.entity.PaymentTransaction;
import com.backend.enums.PaymentStatus;

@Repository
public interface PaymentTransactionRepository extends JpaRepository<PaymentTransaction, Long>{
	
	  Optional<PaymentTransaction> findByRazorpayOrderId(String razorpayOrderId);
	  
	
	  
	  @Query("""
	            SELECT COALESCE(SUM(p.amount), 0)
	            FROM PaymentTransaction p
	            WHERE p.paymentStatus = :status
	            """)
	    Long sumAmountByStatus(@Param("status") PaymentStatus status);

}
