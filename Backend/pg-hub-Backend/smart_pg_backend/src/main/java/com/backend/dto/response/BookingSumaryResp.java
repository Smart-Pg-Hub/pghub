package com.backend.dto.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BookingSumaryResp {

	    private Long roomId;

	    private String propertyName;

	    private String roomNumber;

	    private String roomType;

	    private Long monthlyRent;

	    private Long firstMonthRent;

	    private Long securityDeposit;

	    private Long totalAmount;
}
