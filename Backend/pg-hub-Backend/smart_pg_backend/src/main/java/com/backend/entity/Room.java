package com.backend.entity;

import java.util.*;

import com.backend.enums.AccpStatus;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;
@Entity 
@Getter 
@Setter
@ToString(exclude = {"pgProperty","bookings"})
@AllArgsConstructor
@RequiredArgsConstructor 
@Table(name="pg_rooms")
public class Room {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "room_id")
	private Long id;

	@Column(name = "room_num", unique = true)
	private String roomNumber;
 
	@Column(name = "rent_amt")
	private Long amount;

	@Column(name = "occupied_beds", nullable = false)
	private Integer occupiedBeds = 0;

	@Column(name = "floor_no")
	private Integer floorNumber;

	@Column(name = "security_deposit")
	private Long securityDeposit;

	@Column(name = "active")
	private Boolean active = true;

	@Column(length = 500)
	private String description;

	@Column(name = "status")
	@Enumerated(EnumType.STRING)
	private AccpStatus status = AccpStatus.AVAILABLE;
	
	  @Column(name = "room_capacity", nullable = false)
	    private Integer roomCapacity=0;
	
	
	//owning side
	@ManyToOne
	@JoinColumn(name="pg_id",nullable = false)
	private Property pgProperty;
	
	@OneToMany(mappedBy = "myRoom" , cascade = CascadeType.ALL)
	private List<Booking> bookings=new ArrayList<>();
	
	
}
