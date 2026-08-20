package com.backend.serviceIpl;

import java.util.Map;

import org.modelmapper.ModelMapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.backend.customException.AlreadyExistsException;
import com.backend.customException.AuthenticationFailledException;
import com.backend.customException.ResourceNotFoundException;
import com.backend.dto.response.AouthResponse;
import com.backend.dto.req.AouthUserReq;
import com.backend.dto.response.ApiResponse;
import com.backend.dto.response.LoginResponse;
import com.backend.dto.req.RegisterReq;
import com.backend.dto.req.UpdateReq;
import com.backend.entity.User;
import com.backend.loggingClient.LogRequest;
import com.backend.loggingClient.LoggingClient;
import com.backend.repository.UserRepository;
import com.backend.security.CustomUserDetailsImpl;
import com.backend.security.JwtUtil;
import com.backend.service.CloudanaryImgService;
import com.backend.service.UserService;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@Service
@Transactional
public class UserServiceIml implements UserService {
	private final UserRepository userRepository;
	private final AuthenticationManager manager;
	private final JwtUtil jwtUtil;
	private PasswordEncoder passwordEncoder;
	private final ModelMapper mapper;
	private final CloudanaryImgService cldService;
	private final LoggingClient loggingClient;

	@Override
	public LoginResponse authenticateUser(AouthUserReq request) {

		try {

			Authentication authentication = manager
					.authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));

			CustomUserDetailsImpl userDetails = (CustomUserDetailsImpl) authentication.getPrincipal();

			String token = jwtUtil.generateJWT(userDetails);

			User user = userRepository.findByEmail(userDetails.getUsername())
					.orElseThrow(() -> new ResourceNotFoundException("User Not Found"));

			AouthResponse userDto = mapper.map(user, AouthResponse.class);
			
			loggingClient.sendLog( new LogRequest("BACKEND", "INFO", "User logged in successfully", "Login"));

			return new LoginResponse(token, userDto, user.getAddress());
		} catch (BadCredentialsException e) {
			throw new BadCredentialsException("Invalid email or password");
		}
	}

	@Override
	public Long registerUser(RegisterReq request) {

		// Check email already exists
		if (userRepository.existsByEmail(request.getEmail())) {
			throw new AlreadyExistsException("Email Already Registered");
		}

		User user = mapper.map(request, User.class);
		// Encrypt password
		user.setPassword(passwordEncoder.encode(request.getPassword()));

		user.setRole(request.getRole());

		user.setIdProofPhoto(cldService.uploadFile(request.getIdProofPhoto(), CloudanaryImgService.FOLDER_ID_PROOFS));
		user.setAvtarPhoto(cldService.uploadFile(request.getAvtarPhoto(), CloudanaryImgService.FOLDER_AVATARS));

		// Save user
		User savedUser = userRepository.save(user);

		return savedUser.getId();
	}

	@Override
	public String update(UpdateReq request, Long userId) {

		User user = userRepository.findById(userId)
				.orElseThrow(() -> new ResourceNotFoundException("failed to update"));

		user.setPhone(request.getPhone());

		if (request.getAvtarPhoto() != null && !request.getAvtarPhoto().isEmpty()) {

			String imageUrl = cldService.uploadFile(request.getAvtarPhoto(), "avatars");
			user.setAvtarPhoto(imageUrl);
		}

		userRepository.save(user);

		return user.getAvtarPhoto();
	}

}
