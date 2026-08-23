package com.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.dto.req.OwnerReq;
import com.backend.service.OwnerService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/owner")
@RequiredArgsConstructor
public class OwnerController {
	private final OwnerService ownerService;
	
	
	@PostMapping(value = "/register",consumes = "multipart/form-data")
	public ResponseEntity<?>register(@ModelAttribute OwnerReq request)
	{
		return ResponseEntity.ok(ownerService.registerOwner(request));
	}

}
