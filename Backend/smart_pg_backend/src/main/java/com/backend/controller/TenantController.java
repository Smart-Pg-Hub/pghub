package com.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.dto.req.RegisterReq;
import com.backend.dto.req.TenantReq;
import com.backend.service.TenantService;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/tenant")
@AllArgsConstructor
public class TenantController {
	private final TenantService tenantService;

	
	@PostMapping("/register")
	public ResponseEntity<?>tenantRegister(@RequestBody TenantReq request)
	{ 
		return ResponseEntity.ok(tenantService.tenantRegister(request));
	}

}  
 