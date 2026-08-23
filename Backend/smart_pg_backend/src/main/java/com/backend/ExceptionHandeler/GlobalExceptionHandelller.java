package com.backend.ExceptionHandeler;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.backend.customException.AlreadyExistsException;
import com.backend.customException.AuthenticationFailledException;
import com.backend.customException.ResourceNotFoundException;
import com.backend.dto.response.ApiResponse;

import lombok.Getter;
import lombok.Setter; 

@RestControllerAdvice
@Getter
@Setter 
public class GlobalExceptionHandelller {
	
	@ExceptionHandler(ResourceNotFoundException.class)
	public ResponseEntity<?>handleResourceNotFoundException(ResourceNotFoundException e)
	{
		return ResponseEntity.status(HttpStatus.NOT_FOUND)
				.body( new ApiResponse("failled",e.getMessage()));
	}
	@ExceptionHandler(AuthenticationFailledException.class)
	public ResponseEntity<?>HndleAouthFaiiledException(AuthenticationFailledException e)
	{
		return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
				.body(new ApiResponse("Failled", e.getMessage()));
	}
	@ExceptionHandler(AlreadyExistsException.class)
	public ResponseEntity<String> handlePropertyAlreadyExists(
	        AlreadyExistsException ex)
	{
	    return ResponseEntity.status(HttpStatus.CONFLICT) 
	            .body(ex.getMessage());
	}
	@ExceptionHandler(RuntimeException.class)
	public ResponseEntity<?>handleRuntimeException(RuntimeException e)
	{
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR) // SC 500
				.body(new ApiResponse("Failed", e.getMessage())); 
	}
	
	@ExceptionHandler(MethodArgumentNotValidException.class)
	@ResponseStatus(code=HttpStatus.BAD_REQUEST)
	 public Map<String,String>handleMethodArgumentNotValidException(MethodArgumentNotValidException e)
	{
		List<FieldError>fieldErrors=e.getFieldErrors();  
		Map<String, String> fieldErrMap = fieldErrors.stream() // Stream<FieldError>
				.collect(Collectors.toMap(FieldError::getField, FieldError::getDefaultMessage));
		return fieldErrMap;
	}
 
}
 