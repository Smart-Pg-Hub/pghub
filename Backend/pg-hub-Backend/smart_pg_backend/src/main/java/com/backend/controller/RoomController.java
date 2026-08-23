package com.backend.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.dto.req.AddRoomReq;
import com.backend.service.RoomService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/room")
@RequiredArgsConstructor
public class RoomController {
	
	private final RoomService roomService; 
	
	 
	@PostMapping("/add") 
	public ResponseEntity<?>addRoom(@RequestBody AddRoomReq request)
	{  
			return ResponseEntity.ok(roomService.addRoom(request));  
	}     
	
	@GetMapping("/seeRoom/{id}") 
	public ResponseEntity<?>seeRoom(@PathVariable Long id)
	{  
			return ResponseEntity.ok(roomService.getById(id));	 
	}
	@GetMapping("/getAll/{pgid}")
	public ResponseEntity<?>getAll(@PathVariable Long pgid)
	{
		return ResponseEntity.ok(roomService.getAll(pgid));
	} 
  
}
  