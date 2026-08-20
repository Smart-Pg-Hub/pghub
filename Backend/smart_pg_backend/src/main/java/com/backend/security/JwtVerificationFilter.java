package com.backend.security;

import java.io.IOException; 
import java.util.List;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import io.jsonwebtoken.Claims;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Component 
@RequiredArgsConstructor  
@Slf4j
public class JwtVerificationFilter extends OncePerRequestFilter {
	private final JwtUtil jwtUtils;
	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		try {
			String authHeader = request.getHeader("Authorization");
			if (authHeader != null && authHeader.startsWith("Bearer ")) {
				String jwt = authHeader.substring(7);
				Claims payload = jwtUtils.verifyJwtAndExtractClaims(jwt);
				Long userId = payload.get("user_id", Long.class);
				String roleName = payload.get("user_role", String.class);
				UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(userId, null,
						List.of(new SimpleGrantedAuthority(roleName)));
				SecurityContextHolder.getContext().setAuthentication(token);				

				System.out.println("Role from JWT = " + roleName);
		 	}
			
			filterChain.doFilter(request, response);
		} catch (Exception e) {
			SecurityContextHolder.clearContext();
			response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);// SC 401
			response.getWriter().print("Invalid JWT - Auth Failed !!!!!!");
			return;
		}
	}
}

