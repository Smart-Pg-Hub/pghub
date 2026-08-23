package com.backend.service;

import java.util.List;

import com.backend.dto.req.ReviewsReq;
import com.backend.dto.response.ReviewsRes;

public interface ReviewsService {

	List<ReviewsRes> getReviews(Long id);

	ReviewsRes addReviews(ReviewsReq request);

}
 