package com.backend.dto.response;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import com.backend.entity.Address;
import com.backend.enums.PgType;

@Getter
@Setter
@RequiredArgsConstructor 
public class PropertyResponse { 
	private Long id;
	private String name;
	private Integer totalRooms;
	private String amenity; 
	private String email;
	private String contact;
    private Address address;
    private String propertyProfilePhoto;
	private PgType pgType;
 
} 
