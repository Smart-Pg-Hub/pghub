package com.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.backend.entity.PropertyPhotos;

@Repository
public interface PropertyPhotosRepository extends JpaRepository<PropertyPhotos, Long>{
	
	List<PropertyPhotos> findByPropertyId(Long propertyId);

}
