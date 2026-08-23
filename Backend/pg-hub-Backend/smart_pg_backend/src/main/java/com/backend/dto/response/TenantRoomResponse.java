package com.backend.dto.response;

import com.backend.enums.CheckoutStatus;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TenantRoomResponse {

	private Long bookingId;
	private String roomNumber;
	private Integer floorNumber; 
	 private Integer roomCapacity;
	private String status;
	private CheckoutStatus checkoutStatus;

}
