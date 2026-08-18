package com.backend.dto.req;

import org.springframework.web.multipart.MultipartFile;


import com.backend.entity.Address;
import com.backend.enums.PgType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString 
@AllArgsConstructor
public class AddPropReq {
	private Long ownerId;
	private String name;
	private Integer totalRooms;
	private String amenity;
	private String email;
	private String contact;
	private MultipartFile propertyProfilePhoto;
	private PgType pgType;  
	private Address address;

}
