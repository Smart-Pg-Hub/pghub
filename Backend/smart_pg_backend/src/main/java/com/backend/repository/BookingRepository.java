package com.backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.backend.entity.Booking;
import com.backend.entity.Tenant;
import com.backend.enums.BookingStatus;
@Repository
public interface BookingRepository extends JpaRepository<Booking, Long>{
	
	public boolean existsByMyTenantIdAndStatus(Long tenantId, BookingStatus status);
	
//	JOIN FETCH b.monthlyRent m
	@Query("""
			SELECT b
			FROM Booking b
			JOIN FETCH b.myTenant t
			JOIN FETCH t.userDetails u
			JOIN FETCH b.myRoom r
			JOIN FETCH r.pgProperty p
			WHERE p.id = :pgId 
			AND b.status = :status
			""")
			List<Booking> getAllTenantsByProperty(@Param("pgId") Long pgId,@Param("status")BookingStatus bookingStatus);	
	 
	
	  Optional<Booking> findByMyTenantIdAndStatus( Long tenantId,BookingStatus bookingStatus);
	  long countByMyTenantId(Long tenantId);
	  
	  long countByStatus(BookingStatus status);
 
} 
 
  