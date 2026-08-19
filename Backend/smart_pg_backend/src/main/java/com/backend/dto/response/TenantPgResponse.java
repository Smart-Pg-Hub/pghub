package com.backend.dto.response;

import java.util.List;

import com.backend.entity.Address;
import com.backend.enums.PgType;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TenantPgResponse {
	 private Long bookingId;

	    private PropertyResponse property;
 
	    private String ownerName;

	    private String roomNumber;
	    private Integer roomType;

	    private Long monthlyRent;

	    private String bookingStatus;

}
 