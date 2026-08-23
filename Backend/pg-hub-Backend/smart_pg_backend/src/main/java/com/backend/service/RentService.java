package com.backend.service;

import java.util.List;

import com.backend.dto.req.RentPaymentRequest;
import com.backend.dto.req.RentReq;
import com.backend.dto.response.RentResp;
import com.backend.entity.Booking;
import com.backend.entity.Rent;


public interface RentService {
	

    RentResp createRent(RentReq request);
    List<RentResp> getTenantRents(Long tenantId);
//    Rent createFirstRent(Booking booking); 

	String payRent(RentPaymentRequest request,Long userId,Long rentId);
	
	List<RentResp> getRentDetails(Long pgId);
 
}
   