package com.backend.controller;

import java.time.LocalDate;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.backend.dto.req.BookingReq;
import com.backend.enums.CheckoutAction;
import com.backend.service.BookingService;

import lombok.RequiredArgsConstructor;

@RequestMapping("/booking")
@RestController
@RequiredArgsConstructor
public class BookingController {
	private final BookingService bookService;
	
	
	
	@PostMapping("/validate/{roomId}") 
	public ResponseEntity<?>validateBooking(@PathVariable Long roomId,Authentication authentication)
	{
	
		Long userId = (Long) authentication.getPrincipal();

		return ResponseEntity.ok(bookService.validateBooking(roomId, userId));   
	}
	
	@PostMapping("/book-room") 
	public ResponseEntity<?>roomBook(@RequestBody BookingReq request,Authentication authentication)
	{
		Long userId = (Long) authentication.getPrincipal();
		System.out.print("room book called");
		return ResponseEntity.ok(bookService.roomBook(request,userId));   
	}  
	
	@GetMapping("/getTenants/{pgId}")
	public ResponseEntity<?>getAllTenantsByProperty(@PathVariable Long pgId)
	{
			
		return ResponseEntity.ok(bookService.getAllTenantsByProperty(pgId));   
	} 
	
	@PutMapping("/checkout-request/{bookingId}")
	public ResponseEntity<?>checkoutRequest(@PathVariable Long bookingId,Authentication authentication)
	{
		Long userId = (Long) authentication.getPrincipal();
		return ResponseEntity.ok(bookService.checkoutRequest(bookingId,userId)); 
	}
	
	
	@PutMapping("/checkout-approval/{bookingId}")
	public ResponseEntity<?>checkoutRequest(@PathVariable Long bookingId,Authentication authentication,@RequestBody CheckoutAction action)
	{
		Long userId = (Long) authentication.getPrincipal();
		return ResponseEntity.ok(bookService.checkoutAction(bookingId,userId,action)); 
	}
	
	@GetMapping("/summary/{roomId}")
	public ResponseEntity<?> getBookingSummary( @PathVariable Long roomId)
	{ 
		 System.out.println("Booking Summary API Called");

	    return ResponseEntity.ok(  bookService.getBookingSummary(roomId));
	} 
	

    @GetMapping("/my-pg")
    public ResponseEntity<?> getMyPg(Authentication authentication) {
        return ResponseEntity.ok(bookService.getMyPgDetails(authentication));
    }
    @GetMapping("my-room")
    public ResponseEntity<?> getMyRoom(Authentication authentication) {
        return ResponseEntity.ok(bookService.getMyRoomDetails(authentication));
    } 

} 
 