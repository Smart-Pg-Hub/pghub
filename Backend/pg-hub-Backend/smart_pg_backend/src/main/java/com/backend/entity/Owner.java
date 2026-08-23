package com.backend.entity;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.AttributeOverride;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
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
@Table(name="pg_owner")
//@AttributeOverride(name="id",column = @Column(name="owner_id"))

public class Owner extends BaseClass{
	
	@Column(name="business_name")
	private String businessName;
	
	@Column(name="account_number")
	private String accountNumber;
	
	@Column(name="gst_number")
	private String gstNumber;
	
	@Column(name="pg_licencePhoto")
	private String licensePhoto;
	
	@Column(name="licence_number")
	private String licenseNumber;
		
	@OneToOne
    @MapsId
    @JoinColumn(name = "owner_id")
    private User userDetails;
	
	@OneToMany(mappedBy = "myOwner", cascade = CascadeType.ALL)
	private List<Property> myProperties = new ArrayList<>(); 	
	
	public Owner(String businessName, String accountNumber) {
		super();
		this.businessName = businessName;
		this.accountNumber = accountNumber;
	}
	
}
