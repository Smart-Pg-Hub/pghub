package com.backend.controller;

import org.springframework.web.bind.annotation.RestController;

import com.backend.dto.req.ComplaintsReq;
import com.backend.service.ComplaintsService;

import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

 

@RestController
@RequiredArgsConstructor
@RequestMapping("/complaints") 
public class ComplaintsController {
	
	private final ComplaintsService cmpRepo;
	
	@PostMapping("/create")
	ResponseEntity<?>createComplaint(@RequestBody ComplaintsReq request,Authentication authentication)
	{
		System.out.print("create complints");
		Long userId = (Long) authentication.getPrincipal();
		return ResponseEntity.ok(cmpRepo.createComplaint(request,userId));
	} 
	
	@GetMapping("/getComplaints")
	ResponseEntity<?>getComplaints(Authentication authentication)
	{
		
		Long userId = (Long) authentication.getPrincipal();
		return ResponseEntity.ok(cmpRepo.getComplaints(userId));
	}
	@GetMapping("/get-Bypg/{pgId}")
	ResponseEntity<?>getComplaintsByPgId(@PathVariable Long pgId,Authentication authentication)
	{
		System.out.print("get by pgid");
		
		Long userId = (Long) authentication.getPrincipal();
		return ResponseEntity.ok(cmpRepo.getComplaintsByPgId(userId,pgId));
	} 
	
	@PutMapping("/resolve/{cmpId}")
	ResponseEntity<?>resolveComplaints(@PathVariable Long cmpId,Authentication authentication)
	{
		System.out.print("get by pgid");
		
		Long userId = (Long) authentication.getPrincipal();
		return ResponseEntity.ok(cmpRepo.resolveComplaints(userId,cmpId));
	} 
}
 