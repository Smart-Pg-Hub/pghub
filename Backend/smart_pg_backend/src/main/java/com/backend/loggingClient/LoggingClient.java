package com.backend.loggingClient;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;



@FeignClient(name = "PGHUB-GATEWAY")
public interface LoggingClient {
	
	 @PostMapping("/api/logs")
	    String sendLog(@RequestBody LogRequest request);

}
