package com.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.dto.req.RentPaymentRequest;
import com.backend.dto.req.RentReq;
import com.backend.service.RentService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/rent")
@RequiredArgsConstructor
public class RentController {
	private final RentService rentService;

	@PostMapping("/create")
	public ResponseEntity<?> createRent(@RequestBody RentReq request) {
		return ResponseEntity.ok(rentService.createRent(request));
	}
	

	@PostMapping("/pay/{rentId}")
	public ResponseEntity<?> payRent(@PathVariable Long rentId, @RequestBody RentPaymentRequest request, Authentication authentication)
	{
		Long userId = (Long) authentication.getPrincipal(); 
		System.out.print("user id="+ userId);

	    return ResponseEntity.ok(rentService.payRent(request, userId,rentId));

	}

	@GetMapping("/tenant/{tenantId}")
	public ResponseEntity<?> getTenantRent(@PathVariable Long tenantId) {
		return ResponseEntity.ok(rentService.getTenantRents(tenantId));
	}
	 
	//
	@GetMapping("/property/{propertyId}")
	public ResponseEntity<?> getPropertyRent(@PathVariable Long propertyId) {
		return ResponseEntity.ok(rentService.getRentDetails(propertyId));
	}

	 

}
