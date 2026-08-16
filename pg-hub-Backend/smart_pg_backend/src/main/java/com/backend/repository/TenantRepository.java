package com.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.backend.entity.Tenant;

@Repository
public interface TenantRepository extends JpaRepository<Tenant, Long>{ 

}
