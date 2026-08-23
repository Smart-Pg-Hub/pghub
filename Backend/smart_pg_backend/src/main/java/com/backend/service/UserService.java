package com.backend.service;


import com.backend.dto.req.AouthUserReq;
import com.backend.dto.response.LoginResponse;
import com.backend.dto.req.RegisterReq;
import com.backend.dto.req.UpdateReq;
import com.backend.entity.User;

import jakarta.validation.Valid;

public interface UserService {
 
	LoginResponse authenticateUser(AouthUserReq request);

	Long registerUser(@Valid RegisterReq request);

	String update(UpdateReq request,Long userId);   


} 
   