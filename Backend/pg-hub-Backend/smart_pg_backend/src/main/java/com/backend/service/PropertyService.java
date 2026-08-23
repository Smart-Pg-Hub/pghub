package com.backend.service;

import java.util.List;


import com.backend.dto.req.AddPropReq;
import com.backend.dto.req.AddPropertyPhotosReq;
import com.backend.dto.response.AddPropertyPhotosResp;
import com.backend.dto.response.PropertyResponse;
import com.backend.dto.req.UpdatePropertyReq;
import com.backend.entity.Property;
import com.backend.enums.PgType;

public interface PropertyService {

	String addProperty(AddPropReq request);

	PropertyResponse viewProperty(Long id);

	String deleteProperty(Long id);

	String updateProperty(UpdatePropertyReq request,Long id);

	List<PropertyResponse> search(String name, String city, PgType type);

	List<PropertyResponse> getAllProperties();

	List<PropertyResponse> getPropertiesByOwnerId(Long userId);

	
} 
     