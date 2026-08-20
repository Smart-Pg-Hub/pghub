package com.backend.serviceIpl;

import java.util.ArrayList;
import java.util.List;

import java.util.Properties;

import org.modelmapper.ModelMapper;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.backend.customException.AlreadyExistsException;
import com.backend.customException.ResourceNotFoundException;
import com.backend.dto.req.AddPropReq;
import com.backend.dto.req.AddPropertyPhotosReq;
import com.backend.dto.response.AddPropertyPhotosResp;
import com.backend.dto.response.PropertyResponse;
import com.backend.dto.req.UpdatePropertyReq;
import com.backend.entity.Owner;
import com.backend.entity.Property;
import com.backend.entity.User;
import com.backend.enums.PgType;
import com.backend.repository.BookingRepository;
import com.backend.repository.OwnerRepository;
import com.backend.repository.PropertyRepository;
import com.backend.repository.UserRepository;
import com.backend.service.CloudanaryImgService;
import com.backend.service.PropertyService;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class PropertyServiceIml implements PropertyService {
	
	private final PropertyRepository propRepo;
	private final UserRepository userRepo;
	private final OwnerRepository ownerRepo;
	private final CloudanaryImgService cldService;
	private final ModelMapper mapper;
  
	@Override
	public String addProperty(AddPropReq request) {

	    if (propRepo.existsByName(request.getName())) {
	        throw new AlreadyExistsException("Property already exists");
	    }
	    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
	    System.out.println(authentication.getPrincipal());

	    Long ownerId = (Long) authentication.getPrincipal();
//	    System.out.println(ownerId);

//	    Owner owner = ownerRepo.findById(request.getOwnerId());
	    
	    Owner owner = ownerRepo.findById(ownerId)
	            .orElseThrow(() -> new ResourceNotFoundException("Owner not found"));

	    Property entity = mapper.map(request, Property.class);

        entity.setPropertyProfilePhoto(cldService.uploadFile(request.getPropertyProfilePhoto(), CloudanaryImgService.FOLDER_PROPERTIES)); 
	    
	    entity.setMyOwner(owner);

	    propRepo.save(entity);

	    return "Property added successfully.";
	} 

	@Override
	public PropertyResponse viewProperty(Long id) { 
		
		Property entity=propRepo.findById(id)
	 			.orElseThrow(()-> new ResourceNotFoundException("Property not Found"));
		return mapper.map(entity,PropertyResponse.class);
	}
 
	@Override
	public String deleteProperty(Long id) {
		 
		propRepo.findById(id)
				.orElseThrow(()-> new ResourceNotFoundException("Property not Found"));
		propRepo.deleteById(id);
		return "Succsefully deleted proprty";  
	} 

	@Override
	public String updateProperty(UpdatePropertyReq request,Long id) {
		
		Property entity=propRepo.findById(id)
				.orElseThrow(()-> new ResourceNotFoundException("pg not Found"));
		
		entity.setName(request.getName()); 
//		entity.setRent(request.getRent());
		 propRepo.save(entity);
				
		return "Succsfully Updated the Property details";
	}

	@Override
	public List<PropertyResponse> search(String name, String city, PgType type) {
		List<Property>properties=propRepo.searchProperties(name, city, type);
		 
		if(properties==null)   
			throw new ResourceNotFoundException("Pg not Found");
		
		  return properties.stream()
		            .map(property -> mapper.map(property, PropertyResponse.class))
		            .toList();
	}

	@Override
	public List<PropertyResponse> getAllProperties() {
		List<Property>properties=propRepo.findAll();
		if(properties.isEmpty())
			throw new ResourceNotFoundException("No curspond pg's");
		
		return properties.stream()
	            .map(property -> mapper.map(property, PropertyResponse.class))
	            .toList();
	} 

	@Override
	public List<PropertyResponse> getPropertiesByOwnerId(Long ownerId) {
		Owner owner=ownerRepo.findById(ownerId)
				.orElseThrow(()-> new ResourceNotFoundException("Owner not Found"));
		 
		List<Property> properties=propRepo.findAllByMyOwner_Id(ownerId);
				 
		if(properties.isEmpty())
			throw new ResourceNotFoundException("No curspond pg's");
		
		return properties.stream()
	            .map(property -> mapper.map(property, PropertyResponse.class))
	            .toList();
	}


	
	  
}  
