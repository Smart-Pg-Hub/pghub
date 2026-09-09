package com.pghub.eureka;

import org.springframework.boot.SpringApplication;

import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.server.EnableEurekaServer;

@SpringBootApplication
@EnableEurekaServer
public class PghubEurekaServerApplication {

	public static void main(String[] args) {
		SpringApplication.run(PghubEurekaServerApplication.class, args);
	}

}
