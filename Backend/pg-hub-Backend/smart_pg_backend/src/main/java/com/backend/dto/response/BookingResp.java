package com.backend.dto.response;
import java.time.LocalDate;
import java.time.LocalDateTime;

import com.backend.enums.BookingStatus;
import com.backend.enums.PaymentMethod;
import com.backend.enums.PaymentStatus;

import lombok.Getter;
import lombok.Setter;




@Getter
@Setter
public class BookingResp {
	
	    private Long bookingId;
	    private String tenantName;
	    private Long tenantId; 
	    private Long roomId;
	    private String roomNumber;  
	    private LocalDate bookedOn;
	    private LocalDate joiningDate; 
	    private Long securityDeposit;
	    private BookingStatus bookingStatus; 
	    private Long firstMonthRent;
	    private Double totalAmount;	
	    
	    private String propertyName;
	    private String propertyAddress;
	    private String ownerName;
	    }