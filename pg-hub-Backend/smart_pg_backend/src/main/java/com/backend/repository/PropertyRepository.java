package com.backend.repository;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.backend.entity.Property;
import com.backend.enums.PgType; 
@Repository
public interface PropertyRepository extends JpaRepository<Property,Long>{
	
	
	List<Property> findAllByMyOwner_Id(Long ownerId);
	
	 boolean existsByName(String name);
	 @Query("""
			 SELECT p FROM Property p
			 WHERE (:name IS NULL OR LOWER(p.name) LIKE LOWER(CONCAT('%', :name, '%')))
			 AND (:city IS NULL OR LOWER(p.address.city) LIKE LOWER(CONCAT('%', :city, '%')))
			 AND (:type IS NULL OR p.pgType = :type)
			 """)
			 List<Property> searchProperties(@Param("name") String name, @Param("city") String city,  @Param("type") PgType type);
	 
	 long countByMyOwner_Id(Long ownerId);
}