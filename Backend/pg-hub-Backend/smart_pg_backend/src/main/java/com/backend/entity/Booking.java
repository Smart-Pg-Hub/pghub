package com.backend.entity;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.backend.enums.BookingStatus;
import com.backend.enums.CheckoutStatus;

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
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "booking")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Booking {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "booking_id")
	private Long id;

	@Column(name = "checkin_date")
	private LocalDate joiningDate;

	@Column(name = "checkout_date")
	private LocalDate checkoutDate;

	@Column(name = "booking_date")
	private LocalDate bookedOn;

	private Integer duration;

	@Column(name = "security_deposit")
	private Long securityDeposit;
	
	@Column(name = "created_at")
	private LocalDateTime createdAt = LocalDateTime.now();

	@Enumerated(EnumType.STRING)
	private BookingStatus status = BookingStatus.PENDING;

	@ManyToOne
	@JoinColumn(name = "tenant_id")
	private Tenant myTenant;
	
    @Enumerated(EnumType.STRING)
    private CheckoutStatus checkoutStatus=CheckoutStatus.NONE;
	
//	@OneToMany(mappedBy = "booking", )
	@OneToMany(mappedBy="booking", cascade = CascadeType.ALL)
	private List<Rent> rents = new ArrayList<>();

	@ManyToOne
	@JoinColumn(name = "room_id")
	private Room myRoom;
}
