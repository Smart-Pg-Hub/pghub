package com.backend.dto.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateOrderResponse {

	  private String orderId;
	    private Integer amount;
	    private String currency;
	    private String receipt;
	    private String status;

}
