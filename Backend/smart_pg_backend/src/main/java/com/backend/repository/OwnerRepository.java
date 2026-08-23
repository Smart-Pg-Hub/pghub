package com.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.backend.entity.Owner;

@Repository
public interface OwnerRepository extends JpaRepository<Owner, Long>{
	

}
