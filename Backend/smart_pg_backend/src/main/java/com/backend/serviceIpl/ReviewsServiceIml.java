package com.backend.serviceIpl;

import java.time.LocalDateTime;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.backend.customException.ResourceNotFoundException;
import com.backend.dto.req.ReviewsReq;
import com.backend.dto.response.ReviewsRes;
import com.backend.entity.Property;
import com.backend.entity.Reviews;
import com.backend.entity.Tenant;
import com.backend.entity.User;
import com.backend.repository.PropertyRepository;
import com.backend.repository.ReviewsRepository;
import com.backend.repository.TenantRepository;
import com.backend.repository.UserRepository;
import com.backend.service.ReviewsService;

import lombok.AllArgsConstructor;

@Service
@Transactional()

@AllArgsConstructor
public class ReviewsServiceIml implements ReviewsService {

	private final ReviewsRepository rvwRepo;
	private final TenantRepository tenantRepo;
	private final PropertyRepository propertyRepo;
	private final UserRepository userRepo;
	private final ModelMapper mapper;

	@Override
	public List<ReviewsRes> getReviews(Long id) {

	 	List<Reviews> reviews = rvwRepo.findByMyPropertyId(id);

		if (reviews == null)
			throw new ResourceNotFoundException("No ratings");

		return reviews.stream().map(review -> {

		    ReviewsRes res = new ReviewsRes();

		    res.setId(review.getId());
		    res.setRating(review.getRating()); 
		    res.setComments(review.getComments());
		    
		    if (review.getMyTenant() != null &&
		    	    review.getMyTenant().getUserDetails() != null) {

		    	    res.setTenantName(
		    	        review.getMyTenant().getUserDetails().getFirstName() + " " +
		    	        review.getMyTenant().getUserDetails().getLastName()
		    	    );
		    	} else {
		    	    res.setTenantName("Unknown");
		    	}
		     
		    res.setDate(review.getCreatedAt());
 
		    return res;

		}).toList();
	}

	@Override
	public ReviewsRes addReviews(ReviewsReq request) {
		
		Property property = propertyRepo.findById(request.getPropertyId())
				.orElseThrow(() -> new RuntimeException("Property not found"));

		User user = userRepo.findById(request.getTenantId())
				.orElseThrow(() -> new RuntimeException("User not found"));

		Tenant tenant = tenantRepo.findById(request.getTenantId())
				.orElseThrow(() -> new RuntimeException("Tenant not found"));

		Reviews review = mapper.map(request, Reviews.class);

		review.setMyProperty(property);
		review.setMyTenant(tenant);

		review.setCreatedAt(LocalDateTime.now());

		Reviews saved = rvwRepo.save(review);

		// Entity -> Response DTO mapping
		ReviewsRes resp = mapper.map(saved, ReviewsRes.class);

		// Extra fields not available directly in Reviews entity
		resp.setTenantName(user.getFirstName() + " " + user.getLastName());

		return resp;
	}

}
