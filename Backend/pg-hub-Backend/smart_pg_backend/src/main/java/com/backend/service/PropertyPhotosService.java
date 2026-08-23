package com.backend.service;

import com.backend.dto.req.AddPropertyPhotosReq;
import com.backend.dto.response.AddPropertyPhotosResp;

import lombok.RequiredArgsConstructor;


public interface PropertyPhotosService {
	
	public AddPropertyPhotosResp addPropertyPhotos(AddPropertyPhotosReq request);

	AddPropertyPhotosResp  getPropertyPhotos(Long propertyId);
}
