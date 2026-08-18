package com.backend.entity;

import java.time.LocalDate;


import java.util.ArrayList;
import java.util.List;

import com.backend.enums.PgType;


import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter 
@Setter
@NoArgsConstructor
@ToString(exclude = "pgRooms")
@Table(name="pg_property") 
public class Property {
	 
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="pg_id")
	private Long id;
	
	@Column(name="pg_name",length = 100)
	private String name;
	private String amenity;
//	private Long rent;
	private Integer totalRooms=0;
	
	@Enumerated(EnumType.STRING)
	private PgType pgType;
	
	private String email;
	private String contact;
	
	@Embedded
	private Address address;
	
	@Column(name="property_profile_photo")
	private String propertyProfilePhoto;
	


	//inverse side (do not update the rel)
	@OneToMany (mappedBy = "pgProperty",cascade = CascadeType.ALL,fetch = FetchType.EAGER)
	private List<Room>pgRooms=new ArrayList<>();
	
	@OneToMany(mappedBy = "myProperty",cascade = CascadeType.ALL)
	private List<Reviews>myReviews=new ArrayList<>();
	
	@OneToMany(mappedBy = "myProperty",cascade = CascadeType.ALL) 
	private List<Complaints>myComplaints=new ArrayList<>(); 
	
	@ManyToOne
	@JoinColumn(name="owner_id") 
	private Owner myOwner; 
	
	@OneToMany(mappedBy = "property", cascade = CascadeType.ALL)
	private List<PropertyPhotos> photos = new ArrayList<>();
  

}
