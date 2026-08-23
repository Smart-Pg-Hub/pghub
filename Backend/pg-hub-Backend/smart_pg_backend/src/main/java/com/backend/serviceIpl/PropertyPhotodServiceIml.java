package com.backend.serviceIpl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.backend.customException.ResourceNotFoundException;
import com.backend.dto.req.AddPropertyPhotosReq;
import com.backend.dto.response.AddPropertyPhotosResp;
import com.backend.entity.Property;
import com.backend.entity.PropertyPhotos;
import com.backend.repository.PropertyPhotosRepository;
import com.backend.repository.PropertyRepository;
import com.backend.service.CloudanaryImgService;
import com.backend.service.PropertyPhotosService;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class PropertyPhotodServiceIml implements PropertyPhotosService {

	private final PropertyRepository propRepo;
	private final CloudanaryImgService cldService;
	private final PropertyPhotosRepository propPhotoRepo;

	@Override
	public AddPropertyPhotosResp addPropertyPhotos(AddPropertyPhotosReq request) {

		Property property = propRepo.findById(request.getPropertyId())
				.orElseThrow(() -> new ResourceNotFoundException("Property not found"));

		List<String> photoUrls = new ArrayList<>();

		for (MultipartFile photo : request.getPhotos()) {

			String photoUrl = cldService.uploadFile(photo, CloudanaryImgService.FOLDER_PROPERTIES);
			PropertyPhotos propertyPhoto = new PropertyPhotos();

			propertyPhoto.setPhotoUrl(photoUrl);
			propertyPhoto.setProperty(property);

			propPhotoRepo.save(propertyPhoto);

			photoUrls.add(photoUrl);
		}

		return new AddPropertyPhotosResp(property.getId(), "Property photos added successfully", photoUrls);
	}

	@Override
	public AddPropertyPhotosResp getPropertyPhotos(Long propertyId) {

		propRepo.findById(propertyId).orElseThrow(() -> new ResourceNotFoundException("Property not found"));

		List<String> photoUrls = propPhotoRepo.findByPropertyId(propertyId).stream()
				.map(PropertyPhotos::getPhotoUrl).toList();

		return new AddPropertyPhotosResp(propertyId, "Property photos fetched successfully", photoUrls);
	}  
}
 