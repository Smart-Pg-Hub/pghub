package com.backend.security;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.backend.entity.User;
import com.backend.repository.UserRepository;

import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
@Service
@RequiredArgsConstructor
public class CustomUserDetailsServiceImpl implements UserDetailsService{
	
	private final UserRepository userRepo;
	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		User user=userRepo.findByEmail(email)
				.orElseThrow(() -> new UsernameNotFoundException("User by email not found !!!!!"));		
		//=> user by email exists -> create UserDetails object -load user details lifted from DB
		return new CustomUserDetailsImpl(user.getId(),user.getFirstName()+" "+user.getLastName(),user.getEmail(),user.getPassword(),user.getRole());
	}	
	
}
