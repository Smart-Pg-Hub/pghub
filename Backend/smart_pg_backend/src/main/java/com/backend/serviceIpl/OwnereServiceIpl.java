package com.backend.serviceIpl;

import java.util.Optional;


import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.backend.customException.ResourceNotFoundException;
import com.backend.dto.req.OwnerReq;
import com.backend.entity.Owner;
import com.backend.entity.User;
import com.backend.repository.OwnerRepository;
import com.backend.repository.UserRepository;
import com.backend.service.CloudanaryImgService;
import com.backend.service.EmailService;
import com.backend.service.OwnerService;

import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class OwnereServiceIpl implements OwnerService {
	 
	private final OwnerRepository ownerRepo; 
	private final UserRepository userRepo; 
	private final CloudanaryImgService cldService;
	private final EmailService emailService;
	private final ModelMapper mapper;
	@Override
	public String registerOwner(OwnerReq request) {
		User user=userRepo.findById(request.getUserId())
			 	 .orElseThrow(() -> new ResourceNotFoundException("User Not Found"));
		
        Owner owner= mapper.map(request,Owner.class);
        owner.setLicensePhoto(cldService.uploadFile(request.getLicensePhoto(), CloudanaryImgService.FOLDER_PROPERTIES));
    
		
        owner.setUserDetails(user);
	 	
        ownerRepo.save(owner);
        
        String message =
                "Dear " + user.getFirstName()+ " " + user.getLastName() + ",\n\n"
                + "Your owner registration has been completed successfully.\n\n"
                + "Your PGHub owner account is now ready to use.\n\n"
                + "Thank you for registering with PGHub.\n\n"
                + "Regards,\n"
                + "PGHub Team";

        emailService.sendEmail(
                user.getEmail(),
                "PGHub - Owner Registration Successful",
                message
        );
				
		return "Registration succsfully";
	}
 
}
