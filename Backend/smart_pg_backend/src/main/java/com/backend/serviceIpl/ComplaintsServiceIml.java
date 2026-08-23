package com.backend.serviceIpl;

import java.time.LocalDate;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.backend.customException.ResourceNotFoundException;
import com.backend.dto.req.ComplaintsReq;
import com.backend.dto.response.ComplaintsResp;
import com.backend.entity.Booking;
import com.backend.entity.Complaints;
import com.backend.entity.Owner;
import com.backend.entity.Tenant;
import com.backend.enums.BookingStatus;
import com.backend.enums.ComplaintStatus;
import com.backend.repository.BookingRepository;
import com.backend.repository.ComplaintRepository;
import com.backend.repository.OwnerRepository;
import com.backend.repository.TenantRepository;
import com.backend.service.ComplaintsService;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor 
public class ComplaintsServiceIml implements ComplaintsService {
	
	private final ComplaintRepository cmpRepo;
	private final BookingRepository bookingRepo;
	private final TenantRepository tenantRepo;
	private final OwnerRepository ownerRepo;
	private final ModelMapper mapper;
	

	@Override
	public String createComplaint(ComplaintsReq request,Long userId) {
		
	    Tenant tenant = tenantRepo.findById(userId)
	            .orElseThrow(() -> new ResourceNotFoundException("Tenant not found"));

	    Booking booking = bookingRepo
	            .findByMyTenantIdAndStatus(tenant.getId(), BookingStatus.BOOKED)
	            .orElseThrow(() -> new ResourceNotFoundException("No active booking found"));

	    Complaints complaint = mapper.map(request, Complaints.class);

	    complaint.setMyTenant(tenant);
	    complaint.setMyBooking(booking);	    
	    complaint.setMyProperty(booking.getMyRoom().getPgProperty());
	    complaint.setCreatedDate(LocalDate.now());
	    complaint.setStatus(ComplaintStatus.PENDING);

	    cmpRepo.save(complaint);

	    return "Complaint submitted successfully.";
	}
 
	@Override
	public List<ComplaintsResp> getComplaints(Long userId) {

	    Tenant tenant = tenantRepo.findById(userId)
	            .orElseThrow(() -> new ResourceNotFoundException("Tenant not found"));

	    List<Complaints> complaints = cmpRepo.findByMyTenantId(tenant.getId());

	    return complaints.stream()
	            .map(c -> {

	                ComplaintsResp resp = new ComplaintsResp();

	                resp.setComplaintId(c.getId());
	                resp.setBookingId(c.getMyBooking().getId());	                
	                resp.setTenantName(c.getMyTenant().getUserDetails().getFirstName());
	                resp.setPropertyName(c.getMyProperty().getName());
	                resp.setRoomNumber(c.getMyBooking().getMyRoom().getRoomNumber());
	                resp.setSubject(c.getSubject());
	                resp.setDescription(c.getDescription());
	                resp.setStatus(c.getStatus());
	                resp.setCreatedDate(c.getCreatedDate());
	                resp.setResolvedDate(c.getResolvedDate());

	                return resp;
	            })
	            .toList();
	}

	@Override
	public List<ComplaintsResp> getComplaintsByPgId(Long userId, Long pgId) {
		  Owner owner = ownerRepo.findById(userId)
		            .orElseThrow(() -> new ResourceNotFoundException("Owner not found"));

		    List<Complaints> complaints = cmpRepo.findByMyPropertyId(pgId);
		    
		    return complaints.stream()
		            .map(c -> { 

		                ComplaintsResp resp = new ComplaintsResp();
		                resp.setComplaintId(c.getId());
		                resp.setBookingId(c.getMyBooking().getId());	                
		                resp.setTenantName(c.getMyTenant().getUserDetails().getFirstName());
		                resp.setPropertyName(c.getMyProperty().getName());
		                resp.setRoomNumber(c.getMyBooking().getMyRoom().getRoomNumber());
		                resp.setSubject(c.getSubject());
		                resp.setDescription(c.getDescription());
		                resp.setStatus(c.getStatus());
		                resp.setCreatedDate(c.getCreatedDate());
		                resp.setResolvedDate(c.getResolvedDate());

		                return resp;
		            })
		            .toList();
	}

	@Override
	public String resolveComplaints(Long userId, Long cmpId) {

	    Owner owner = ownerRepo.findById(userId)
	            .orElseThrow(() ->
	                    new ResourceNotFoundException("Owner not found"));

	    Complaints complaint = cmpRepo.findById(cmpId)
	            .orElseThrow(() ->
	                    new ResourceNotFoundException("Complaint not found"));
	    if (complaint.getStatus() == ComplaintStatus.RESOLVED) {
	        return "Complaint is already resolved";
	    }

	    complaint.setStatus(ComplaintStatus.RESOLVED);
	   

	    cmpRepo.save(complaint);

	    return "Complaint resolved successfully";
	}
	
}
 