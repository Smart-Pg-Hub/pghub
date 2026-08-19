package com.backend.dto.req;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter 
@Setter
@AllArgsConstructor
public class ReviewsReq {
	    private Long propertyId;
	    private Long tenantId;
	    private Double rating;
	    private String comments;
	
}
