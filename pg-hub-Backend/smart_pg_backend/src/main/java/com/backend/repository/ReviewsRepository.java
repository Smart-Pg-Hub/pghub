package com.backend.repository;

import java.util.List;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.backend.entity.Reviews;
@Repository
public interface ReviewsRepository extends JpaRepository<Reviews,Long>{
	
	     List<Reviews> findByMyPropertyId(Long pgId);	
		

}
   