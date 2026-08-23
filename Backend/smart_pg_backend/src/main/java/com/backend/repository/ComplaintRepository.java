package com.backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.backend.dto.response.ComplaintsResp;
import com.backend.entity.Complaints;
import com.backend.entity.Tenant;
import com.backend.enums.ComplaintStatus;

@Repository
public interface ComplaintRepository extends JpaRepository<Complaints, Long>{

	
		List<Complaints> findByMyTenantId(Long tenantId);

		List<Complaints> findByMyPropertyId(Long pgId);
		
		long countByStatus(ComplaintStatus status);

 
} 
