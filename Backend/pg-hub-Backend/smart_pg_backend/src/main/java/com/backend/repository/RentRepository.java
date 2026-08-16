package com.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.backend.entity.Rent;
import com.backend.enums.RentStatus;

@Repository
public interface RentRepository extends JpaRepository<Rent, Long>{
	
    // Tenant dashboard
    List<Rent> findByTenantId(Long tenantId);
    // Owner dashboard
    List<Rent> findByBookingMyRoomPgPropertyId(Long propertyId);
    
    // Check duplicate monthly rent
    boolean existsByBookingIdAndRentMonth(
            Long bookingId,
            java.time.LocalDate rentMonth
    );
    // Pending rents
    List<Rent> findByStatus(RentStatus status);
    
    @Query("""
    		SELECT r
    		FROM Rent r
    		JOIN r.booking b
    		JOIN b.myRoom rm
    		WHERE rm.pgProperty.id = :pgId
    		 ORDER BY
        CASE
            WHEN r.status = 'PENDING' THEN 0
            WHEN r.status = 'OVERDUE' THEN 1
            WHEN r.status = 'PAID' THEN 2
            ELSE 3
        END
    		""")
    		List<Rent> findAllByProperty(Long pgId);
    

}
