package com.backend.service;

import java.net.URI;
import java.util.List;

import org.springframework.security.core.Authentication;

import com.backend.dto.req.ComplaintsReq;
import com.backend.dto.response.ComplaintsResp;

public interface ComplaintsService {

//	String createComplaint(ComplaintsReq request);

	String createComplaint(ComplaintsReq request, Long userId);

	List<ComplaintsResp> getComplaints(Long userId);

	List<ComplaintsResp> getComplaintsByPgId(Long userId, Long pgId);

	String resolveComplaints(Long userId, Long cmpId);
}
 