package com.backend.dto.req;

import org.springframework.web.multipart.MultipartFile;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
public class UpdateReq {
	private String phone;
	private MultipartFile avtarPhoto;
}
