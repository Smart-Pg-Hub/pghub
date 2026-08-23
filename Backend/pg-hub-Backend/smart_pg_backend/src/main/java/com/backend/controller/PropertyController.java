package com.backend.controller;

import java.util.List;

import java.util.Properties;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.backend.dto.req.AddPropReq;
import com.backend.dto.req.AddPropertyPhotosReq;
import com.backend.dto.req.UpdatePropertyReq;
import com.backend.enums.PgType;
import com.backend.service.PropertyPhotosService;
import com.backend.service.PropertyService;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor 
@RequestMapping("/property")
public class PropertyController { 
	 
	private final PropertyService propService;
	private final PropertyPhotosService propertyPhotosService; 
	
	 
	 
	
	@PostMapping(value="/addProperty", consumes = "multipart/form-data")
	public ResponseEntity<?>addProperty(@ModelAttribute AddPropReq request)
	{  
			return ResponseEntity.ok(propService.addProperty(request));	 
	} 
	  
	@GetMapping("/view/{id}") 
	public ResponseEntity<?>viewProperty(@PathVariable Long id)
	{  
			return ResponseEntity.ok(propService.viewProperty(id));
	}
	   
	@DeleteMapping("/delete/{id}")
	public ResponseEntity<?>deleteProperty(@PathVariable Long id)
	{  
			return ResponseEntity.ok(propService.deleteProperty(id));
	} 
	 
	 
	@PutMapping("/update/{id}")
	public ResponseEntity<?>updateProperty(@RequestBody UpdatePropertyReq request,@PathVariable Long id)
	{  
			return ResponseEntity.ok(propService.updateProperty(request,id)); 
	} 
	//show all propertis to the tenant

	@GetMapping("/all")
    public ResponseEntity<?> getAllProperties() {
        return ResponseEntity.ok(propService.getAllProperties());
    } 
	       
	@GetMapping("/search") 
	public ResponseEntity<?> search( 
	        @RequestParam(required = false) String name,
	        @RequestParam(required = false) String city,
	        @RequestParam(required = false) PgType type) {

	    return ResponseEntity.ok(propService.search(name, city, type));
	}
	
	//get all propertis by ownerId (owner dashbord) 
	@GetMapping("/owner/{ownerId}")
	public ResponseEntity<?>getPropertiesByOwnerId(@PathVariable Long ownerId)
	{
		
		return ResponseEntity.ok(propService.getPropertiesByOwnerId(ownerId));
	}
	
	//add photos
	
		@PostMapping(value="/add-photos", consumes = "multipart/form-data")
		public ResponseEntity<?>addPropertyPhotos(@ModelAttribute AddPropertyPhotosReq request)
		{  
				return ResponseEntity.ok(propertyPhotosService.addPropertyPhotos(request));	 
		} 
		
		//see phots
		 
		@GetMapping("/get-photos/{propertyId}")
		public ResponseEntity<?>getPropertyPhotos(@PathVariable Long propertyId)
		{   
				return ResponseEntity.ok(propertyPhotosService.getPropertyPhotos(propertyId));	 
		} 
}
