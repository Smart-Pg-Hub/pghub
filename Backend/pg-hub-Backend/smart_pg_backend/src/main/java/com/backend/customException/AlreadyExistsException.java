package com.backend.customException;

public class AlreadyExistsException extends RuntimeException{

	public AlreadyExistsException(String errmsg) {
		super(errmsg);
	}
	
} 
