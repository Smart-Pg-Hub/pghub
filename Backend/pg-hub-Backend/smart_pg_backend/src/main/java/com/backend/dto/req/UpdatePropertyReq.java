package com.backend.dto.req;

import org.springframework.web.bind.annotation.RequestMapping;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@RequestMapping
public class UpdatePropertyReq { 
	private String name;
	private Integer totalRooms;
	private Long rent;
} 
