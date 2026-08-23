package com.backend.serviceIpl;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.backend.service.EmailService;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class EmailServiceIml implements EmailService {
	
	private final JavaMailSender mailSender;

	@Override
	public void sendEmail(String to, String subject, String message) {
		
		 SimpleMailMessage mail = new SimpleMailMessage();
		 
		  mail.setTo(to);
	        mail.setSubject(subject);
	        mail.setText(message);

	        mailSender.send(mail);
	}

}
