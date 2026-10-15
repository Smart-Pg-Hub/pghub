package com.backend.loggingClient;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class LogRequest {
	

    private String service;
    private String level;
    private String message;
    private String context;

}
