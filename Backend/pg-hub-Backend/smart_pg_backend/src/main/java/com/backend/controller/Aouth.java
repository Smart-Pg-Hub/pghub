package com.backend.controller;

import org.springframework.http.HttpStatus;

import com.backend.entity.User;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.dto.req.AouthUserReq;
import com.backend.dto.response.ApiResponse;
import com.backend.dto.req.RegisterReq;
import com.backend.dto.req.UpdateReq;
import com.backend.repository.UserRepository;
import com.backend.service.UserService;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;

@RestController// @Controller + @ResponseBody - serialization(java->json)
@RequestMapping("/auth")
@AllArgsConstructor 
public class Aouth {
	
	private final UserService userService;
	private final UserRepository userRepository;

	 private final PasswordEncoder passwordEncoder;
   
	    
	    @PostMapping(value="/signUp", consumes = "multipart/form-data")
	    public ResponseEntity<?> registerUser(@Valid @ModelAttribute RegisterReq request) {
	    	return ResponseEntity.ok(userService.registerUser(request)); 

	    } 
	
	@PostMapping("/login")
	public ResponseEntity<?>userSignIn(@Valid @RequestBody AouthUserReq request)
	{
			return ResponseEntity.ok(userService.authenticateUser(request)); 
	}
	
	@PutMapping(value="/update",consumes="multipart/form-data")
	public ResponseEntity<?>update(@ModelAttribute UpdateReq request, Authentication authentication) 
	{
		Long userId = (Long) authentication.getPrincipal();
		 return ResponseEntity.ok(userService.update(request,userId));
	}
}  
 























 