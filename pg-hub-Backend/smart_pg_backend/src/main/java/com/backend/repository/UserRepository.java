package com.backend.repository;

import java.util.List;

import java.util.Optional;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.backend.entity.User;
import com.backend.enums.Role;

@Repository
public interface UserRepository extends JpaRepository<User,Long>{
	
	boolean existsByEmail(String email);
	Optional<User>findByEmail(String email);
	Optional<User> findByEmailAndPassword(String email,String password);
	List<User> findByRoleIn(List<Role> roles, Sort sort);

}
  