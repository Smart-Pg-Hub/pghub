package com.backend.dto.response;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
@RequiredArgsConstructor
public class ReviewsRes {
	
	private Long id;

    private String tenantName;

    private Double rating;

    private String comments;
 
    private LocalDateTime date;
 
}
 