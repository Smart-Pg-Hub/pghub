package com.backend.dto.response;


import com.backend.entity.Address;
import com.backend.enums.Gender;

import com.backend.enums.Role;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@RequiredArgsConstructor
public class AouthResponse {
	private Long id;
	private Role role;
	private String firstName;
	private String lastName;
	private String email;
	private String phone;
	private Gender gender;
    private Address address;
    private String avtarPhoto;
    private String dob;
}
