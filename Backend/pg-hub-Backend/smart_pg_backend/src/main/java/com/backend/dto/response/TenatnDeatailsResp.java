package com.backend.dto.response;

import java.time.LocalDate;

import java.time.LocalDateTime;

import com.backend.enums.BookingStatus;
import com.backend.enums.CheckoutStatus;
import com.backend.enums.PaymentStatus;
import com.backend.enums.RoomType;
import com.backend.enums.TenantCategory;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@RequiredArgsConstructor
public class TenatnDeatailsResp {
	
	    private Long tenantId;
	    private Long bookingId;
	    private String firstName;
	    private String lastName;
	    private String phone;
	    private LocalDate joiningDate;
	    private String roomNumber;
	    
	    private Long monthlyRent;
	    private Integer floorNumber;
	    private String propertyName;
	    private BookingStatus bookingStatus;
	    private Integer roomCapacity;
	    private CheckoutStatus checkoutStatus; 
}




