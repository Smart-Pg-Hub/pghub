package com.backend.entity;

import java.time.LocalDate;
import java.util.Date;

import com.backend.enums.Gender;
import com.backend.enums.IdProof;
import com.backend.enums.Role;
import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.AttributeOverride;
import jakarta.persistence.Column;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;


@Getter
@Setter
@ToString(exclude = "password",callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
@Entity
@AttributeOverride(name="id",column = @Column(name="user_id"))
public class User extends BaseClass{
	
	@Enumerated(EnumType.STRING)
	private Role role;
	@Column(name="first_name")
	private String firstName;  
	
	@Column(name="last_name")
	private String lastName;
	 
	@Column(unique = true)
	private String email;
	
	@Column(length=14)
	private String phone;
	private String password;
	
	@Enumerated(EnumType.STRING)
	private Gender gender;
	
	@Embedded
	private Address address;
 
	@JsonFormat(pattern = "dd-MM-yyyy")
	private LocalDate dob;
	
	@Column(name="avatar_img")
	private String avtarPhoto; 
	
	@Enumerated(EnumType.STRING)
	@Column(name="id_proof")
	private IdProof idProof;
	
	@Column(name="id_proof_photo")
	private String idProofPhoto;

	}

	
	

