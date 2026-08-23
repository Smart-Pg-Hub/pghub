package com.backend.AdminSeeder;

import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.backend.entity.User;
import com.backend.enums.Role;
import com.backend.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
@RequiredArgsConstructor
public class Admin implements CommandLineRunner {
	
	 private final UserRepository userRepository;
	    private final PasswordEncoder passwordEncoder;

	    @Value("${app.admin.email}")
	    private String adminEmail;

	    @Value("${app.admin.password}")
	    private String adminPassword;
	    

	    @Override
	    public void run(String... args) {
	        if (userRepository.existsByEmail(adminEmail)) {
	            return;
	        }

	        User admin = new User();
	        admin.setFirstName("Admin");
	        admin.setLastName("");
	        admin.setEmail(adminEmail);
	        admin.setPhone("0000000000");
	        admin.setPassword(passwordEncoder.encode(adminPassword));
	        admin.setRole(Role.ADMIN);
	        admin.setCreatedOn(LocalDate.now());
	        userRepository.save(admin);
	        log.info("Seeded default admin account ({}). Change ADMIN_PASSWORD if this is not just local dev.", adminEmail);
	    }

}
