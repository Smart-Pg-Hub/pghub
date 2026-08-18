package com.backend.dto.req;

import org.springframework.web.multipart.MultipartFile;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@RequiredArgsConstructor
@AllArgsConstructor
public class OwnerReq {
	private Long userId;
	private String businessName;
	private String accountNumber;
	private String gstNumber;
	private MultipartFile licensePhoto;
	private String licenseNumber;
	
}
