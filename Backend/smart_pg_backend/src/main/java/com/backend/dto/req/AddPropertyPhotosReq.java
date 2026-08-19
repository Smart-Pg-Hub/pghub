package com.backend.dto.req;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class AddPropertyPhotosReq {

    private Long propertyId;

    private List<MultipartFile> photos;
 
}