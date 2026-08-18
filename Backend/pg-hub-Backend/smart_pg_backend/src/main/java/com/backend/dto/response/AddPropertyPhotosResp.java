package com.backend.dto.response;

import java.util.List;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@AllArgsConstructor
public class AddPropertyPhotosResp {

    private Long propertyId;
    private String message;

    private List<String> photoUrls;

}