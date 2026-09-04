package com.backend.customException;

public class AuthenticationFailledException extends RuntimeException{

	public AuthenticationFailledException(String errmsg) {
		super(errmsg);
	}
	 
	

}
