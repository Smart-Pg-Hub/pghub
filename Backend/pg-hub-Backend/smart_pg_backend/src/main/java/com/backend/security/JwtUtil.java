package com.backend.security;

import java.util.Date; 

import java.util.Map;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;

@Component
public class JwtUtil {
	
	
	//Value based D.I name & value tags in xml file
		@Value("${jwt.secret.key}") //eg of SpEL - spring expression language
		private String secret;
		@Value("${jwt.exp.time}")
		private long expTime; //JWT exp time in msec
		private SecretKey key; //represent symmetric key - same key will be used in signing the token as well as verification
		
		
		@PostConstruct
		public void myInit() {
			key=Keys.hmacShaKeyFor(secret.getBytes());
		}

		//generate token
		public String generateJWT(CustomUserDetailsImpl userDetails)
		{
			Date now=new Date();
			Date expDate=new Date(now.getTime()+expTime); 
			return Jwts.builder() //creates JWT builder 
					.subject(userDetails.getUsername()) //adding subject
					.issuedAt(now) //adding iat
					.expiration(expDate) //adding exp
					//add custom claims
					.claims			
					(Map.of("user_id", userDetails.getUserId(), //k1,v1
							"user_role",userDetails.getRole().name()))
					.signWith(key)
					.compact();
					
		}
		public Claims verifyJwtAndExtractClaims(String jwt) {
			return Jwts.parser() //creates a builder to parse JWT
					.verifyWith(key) //verifying signature
					.build() //builds JWT parser 
					.parseSignedClaims(jwt) //in case of invalid JWT - throws exception
					.getPayload();//extracting the claims
		}
		
}
