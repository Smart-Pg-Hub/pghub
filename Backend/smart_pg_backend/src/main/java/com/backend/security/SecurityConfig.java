package com.backend.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@RequiredArgsConstructor
public class SecurityConfig {

	private final JwtVerificationFilter jwtFilter;

	@Bean
	SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

	    http
	        .csrf(csrf -> csrf.disable())
	        // CORS is handled entirely by the gateway (pghub-gateway). Do NOT add
	        // any CORS config here - the gateway is the only thing the browser
	        // ever talks to directly, so a second CORS source here just causes
	        // duplicate Access-Control-Allow-Origin headers and browser errors.
	        .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))			
	        .authorizeHttpRequests(auth -> auth
	        
	                 .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
	                .requestMatchers("/auth/**","/property/all").permitAll()
	                .requestMatchers(HttpMethod.GET, "/property/search").permitAll()
	             
	                .requestMatchers(HttpMethod.POST, "/property/addProperty").hasAuthority("OWNER")
	                 
	                .requestMatchers(HttpMethod.GET, "/booking/getTenants/**").hasAuthority("OWNER")
	                
	                .requestMatchers(HttpMethod.GET, "/booking/**").hasAnyAuthority("TENANT", "OWNER")
	                .requestMatchers(HttpMethod.POST, "/booking/**").hasAnyAuthority("TENANT", "OWNER")
	                .requestMatchers(HttpMethod.PUT, "/booking/**").hasAnyAuthority("TENANT", "OWNER")
	                .requestMatchers(HttpMethod.POST, "/payment/**").hasAnyAuthority("OWNER", "TENANT")
	                
	                .requestMatchers(HttpMethod.POST, "/rent/**").hasAnyAuthority("OWNER", "TENANT")
	                .requestMatchers(HttpMethod.GET, "/rent/**").hasAnyAuthority("OWNER", "TENANT")
	                
	                .requestMatchers(HttpMethod.POST, "/chat").hasAnyAuthority("TENANT", "OWNER")
	                
	                .anyRequest()
	                .permitAll()
	            )
	        
	        .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

	    return http.build();
	}


	@Bean
	PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	@Bean
	AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
		return config.getAuthenticationManager();
	}

}