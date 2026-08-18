package com.backend.entity;

import java.time.LocalDate;

import com.backend.enums.ComplaintStatus;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Entity
@AllArgsConstructor
@Getter
@Setter
@RequiredArgsConstructor 
public class Complaints {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "cpm_id")
	private Long id;

	@Enumerated(EnumType.STRING)
	private ComplaintStatus status;

	@ManyToOne
	@JoinColumn(name = "pg_id")
	private Property myProperty;

	@ManyToOne
	@JoinColumn(name = "tanant_id")
	private Tenant myTenant;
	@ManyToOne
	@JoinColumn(name = "booking_id")
	private Booking myBooking;

	private String subject;

	@Column(length = 1000)
	private String description;

	private LocalDate createdDate;

	private LocalDate resolvedDate;

}
