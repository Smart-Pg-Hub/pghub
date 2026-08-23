package com.backend.service;

import com.backend.dto.req.AddPropReq;
import com.backend.dto.req.BookingReq;
import com.backend.dto.response.BookingResp;
import com.backend.dto.response.BookingSumaryResp;
import com.backend.dto.req.PaymentDetails;
import com.backend.dto.response.RentResp;
import com.backend.dto.response.TenantPgResponse;
import com.backend.dto.response.TenantRoomResponse;

import java.time.LocalDate;
import java.util.List;

import org.springframework.security.core.Authentication;

import com.backend.dto.response.TenatnDeatailsResp;
import com.backend.entity.Tenant;
import com.backend.enums.CheckoutAction;
 
public interface BookingService {

	BookingResp roomBook(BookingReq request,Long tenantid);

	List<TenatnDeatailsResp> getAllTenantsByProperty(Long pgId);


	String checkoutRequest(Long bookingId, Long userId);
	String checkoutAction( Long bookingId,Long userId,CheckoutAction action);

	BookingSumaryResp getBookingSummary(Long roomId);

	Object validateBooking(Long roomId, Long userId);
	
	public TenantPgResponse getMyPgDetails(Authentication authentication);

	TenantRoomResponse  getMyRoomDetails(Authentication authentication);
	
	
} 
    