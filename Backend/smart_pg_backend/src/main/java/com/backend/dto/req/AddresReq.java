package com.backend.dto.req;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@RequiredArgsConstructor
public class AddresReq {
	    private String pincode;
	    private String state;
	    private String district;
	    private String city;

}
