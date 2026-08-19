package com.backend.controller;

import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.dto.req.ReviewsReq;
import com.backend.service.ReviewsService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/reviews")
 @RequiredArgsConstructor
public class ReviewsController {
	 
	private final ReviewsService reviewsService; 
	 
//	
	
	@PostMapping("/addreviews")
	ResponseEntity<?>addReviews(@RequestBody ReviewsReq request)
	{
		return ResponseEntity.ok(reviewsService.addReviews(request));
	}
	
	 
	@GetMapping("/getreviews/{id}")
	ResponseEntity<?>getReviews(@PathVariable Long id)
	{
		
		return ResponseEntity.ok(reviewsService.getReviews(id));
		
	} 
	  	   

}
