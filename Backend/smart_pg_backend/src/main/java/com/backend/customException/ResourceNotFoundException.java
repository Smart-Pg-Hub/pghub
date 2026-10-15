package com.backend.customException;
public class ResourceNotFoundException extends RuntimeException{

	public ResourceNotFoundException(String errormsg) {
		super(errormsg);
	}

}
