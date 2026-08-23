package com.backend.serviceIpl;

import java.util.Optional;


import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.backend.customException.ResourceNotFoundException;
import com.backend.dto.req.TenantReq;
import com.backend.entity.Tenant;
import com.backend.entity.User;
import com.backend.repository.TenantRepository;
import com.backend.repository.UserRepository;
import com.backend.service.EmailService;
import com.backend.service.TenantService;

import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class TenantServiceIml implements TenantService{
	private final TenantRepository teRepo;
	private final UserRepository userRepo;
	private final EmailService emailService;
	private final ModelMapper mapper;

	@Override
	public String tenantRegister(TenantReq request) {
		
		User user=userRepo.findById(request.getUserId())
				 .orElseThrow(() -> new ResourceNotFoundException("User Not Found"));
		
		Tenant tenant= mapper.map(request,Tenant.class);
		
	 	tenant.setUserDetails(user);
	 	
	 	teRepo.save(tenant);	
				
	 	 String message =
	                "Dear " + user.getFirstName()+ " " + user.getLastName() + ",\n\n"
	                + "Your tenant registration has been completed successfully.\n\n"
	                + "Your PGHub tenant account is now ready to use.\n\n"
	                + "Thank you for registering with PGHub.\n\n"
	                + "Regards,\n"
	                + "PGHub Team";

	        emailService.sendEmail(
	                user.getEmail(),
	                "PGHub - tenant Registration Successful",
	                message
	        );
	 	
		return "Registration succsfully";
	}
	

}
 