package com.backend.entity;

import java.time.LocalDate;

import com.backend.enums.RentStatus;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name="rent") 
public class Rent {
	
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "tenant_id")
    private Tenant tenant;
    @ManyToOne
    @JoinColumn(name = "booking_id")
    private Booking booking;
    private Long amount;
    private LocalDate rentMonth;
    
    private LocalDate dueDate;
    @Enumerated(EnumType.STRING)
    private RentStatus status = RentStatus.PENDING;
    private LocalDate paymentDate;

}




