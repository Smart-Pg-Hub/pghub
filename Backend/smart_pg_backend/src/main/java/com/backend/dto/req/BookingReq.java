package com.backend.dto.req;

import java.time.LocalDate;
import java.time.LocalDateTime;

import com.backend.enums.PaymentMethod;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BookingReq {
	 
    private Long roomId;
    private LocalDate joiningDate; 
    
    private LocalDate bookedOn;
    
    private Integer duration;
    
    private PaymentDetails paymentDetails;

    private PaymentMethod paymentMethod;
}