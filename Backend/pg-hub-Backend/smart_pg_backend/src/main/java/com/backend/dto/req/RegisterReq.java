package com.backend.dto.req;

import java.time.LocalDate;

import org.springframework.web.multipart.MultipartFile;

import com.backend.entity.Address;
import com.backend.enums.Gender;
import com.backend.enums.IdProof;
import com.backend.enums.Role;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RegisterReq {

    private Role role;

    private String firstName;

    private String lastName;

    @Email(message = "Enter a valid email address")
    private String email;

    private String phone;

    @Pattern(
        regexp = "^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[@#$%^&+=!]).{8,20}$",
        message = "Password must be 8-20 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character"
    )
    private String password;

    private Gender gender;

    private Address address; 

    private LocalDate dob;

    private MultipartFile avtarPhoto;

    private IdProof idProof;

    private MultipartFile idProofPhoto;
}