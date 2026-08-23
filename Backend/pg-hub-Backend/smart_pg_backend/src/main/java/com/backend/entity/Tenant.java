package com.backend.entity;

import java.time.LocalDate;


import java.util.*;

import com.backend.enums.TenantCategory;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter 
@Setter
@ToString(exclude = "userDetails",callSuper = true)
@AllArgsConstructor
@RequiredArgsConstructor
@Table(name="tenants")
public class Tenant extends BaseClass{
	
	@Column(name="guardian_number",length=14)
	private String guardianNumber;
	
	@Enumerated(EnumType.STRING)
	private TenantCategory category;
	
	@OneToOne(fetch = FetchType.EAGER,cascade = CascadeType.ALL)
	@MapsId
	@JoinColumn(name="tenant_id",nullable = false)
	private User userDetails; 
	
	 
	@JsonIgnore
	@OneToMany(mappedBy = "myTenant",cascade = CascadeType.ALL)
	private List<Booking> myBooking=new ArrayList<>();
	
	@OneToMany(mappedBy = "myTenant",cascade = CascadeType.ALL)
	private List<Reviews>myReviews=new ArrayList<>();
	
	@OneToMany(mappedBy = "myTenant",cascade = CascadeType.ALL)
	private List<Complaints>myComplaints=new ArrayList<>(); 
	
 	
	 
	public Tenant(String guardianNumber, TenantCategory category) {
		super();
		this.guardianNumber = guardianNumber;
		this.category = category;
	}
	}
	

