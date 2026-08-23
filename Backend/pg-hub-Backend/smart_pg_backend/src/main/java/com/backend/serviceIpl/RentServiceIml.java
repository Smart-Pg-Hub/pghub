package com.backend.serviceIpl;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.backend.customException.ResourceNotFoundException;
import com.backend.dto.req.PaymentDetails;
import com.backend.dto.req.RentPaymentRequest;
import com.backend.dto.req.RentReq;
import com.backend.dto.response.RentResp;
import com.backend.entity.Booking;
import com.backend.entity.PaymentTransaction;
import com.backend.entity.Rent;
import com.backend.entity.Tenant;
import com.backend.enums.PaymentStatus;
import com.backend.enums.PaymentType;
import com.backend.enums.RentStatus;
import com.backend.repository.BookingRepository;
import com.backend.repository.PaymentTransactionRepository;
import com.backend.repository.RentRepository;
import com.backend.repository.TenantRepository;
import com.backend.service.EmailService;
import com.backend.service.RentService;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class RentServiceIml implements RentService {

	private final RentRepository rentRepo;

	private final BookingRepository bookingRepo;

	private final TenantRepository tenantRepo;

	private final ModelMapper mapper;
	private final EmailService emailService;

	private final PaymentTransactionRepository paymentTransactionRepo;

	@Override
	public RentResp createRent(RentReq request) {
		Booking booking = bookingRepo.findById(request.getBookingId())
				.orElseThrow(() -> new ResourceNotFoundException("Booking not found"));

		Tenant tenant = tenantRepo.findById(request.getTenantId())
				.orElseThrow(() -> new ResourceNotFoundException("Tenant not found"));

		Rent rent = new Rent();
		rent.setBooking(booking);
		rent.setTenant(tenant);
		rent.setAmount(booking.getMyRoom().getAmount());
		rent.setRentMonth(request.getRentMonth());
		rent.setDueDate(request.getDueDate());
		rent.setStatus(RentStatus.PENDING);
		Rent saved = rentRepo.save(rent);
		return convertToResp(saved);
	}

	@Override
	public List<RentResp> getTenantRents(Long tenantId) {
		return rentRepo.findByTenantId(tenantId).stream().map(this::convertToResp).toList();
	}

	private RentResp convertToResp(Rent rent) {
		RentResp response = mapper.map(rent, RentResp.class);

		response.setRentId(rent.getId());
		response.setTenantId(rent.getTenant().getId());
		response.setBookingId(rent.getBooking().getId());
		response.setAmount(rent.getAmount());
		response.setTenantName(rent.getTenant().getUserDetails().getFirstName());
		response.setRoomNumber(rent.getBooking().getMyRoom().getRoomNumber());
		response.setPropertyName(rent.getBooking().getMyRoom().getPgProperty().getName());

		return response;
	}
	
	@Override
	public String payRent(RentPaymentRequest request, Long tenantId, Long rentId) {

	    Tenant tenant = tenantRepo.findById(tenantId)
	            .orElseThrow(() -> new ResourceNotFoundException("Tenant not found"));

	    Rent rent = rentRepo.findById(rentId)
	            .orElseThrow(() -> new ResourceNotFoundException("Rent not found"));

	    if (rent.getStatus() == RentStatus.PAID) {
	        throw new RuntimeException("Rent already paid");
	    }

	    PaymentDetails paymentDetails = request.getPaymentDetails();

	    if (paymentDetails == null) {
	        throw new RuntimeException("Payment details not found");
	    }

	    PaymentTransaction transaction = paymentTransactionRepo
	            .findByRazorpayOrderId(paymentDetails.getRazorpayOrderId())
	            .orElseThrow(() ->
	                    new ResourceNotFoundException("Payment transaction not found"));

	    if (transaction.getPaymentStatus() != PaymentStatus.PAID) {
	        throw new RuntimeException("Payment is not verified");
	    }

	    transaction.setTenant(tenant);
	    transaction.setBooking(rent.getBooking());
	    transaction.setAmount(rent.getAmount());
	    transaction.setCurrency("INR");

	    transaction.setPaymentType(PaymentType.MONTHLY_RENT);
	    transaction.setPaymentMonth(rent.getRentMonth());
	    transaction.setPaymentMethod(request.getPaymentMethod());

	    transaction.setRazorpayPaymentId(
	            paymentDetails.getRazorpayPaymentId()
	    );

	    transaction.setRazorpaySignature(
	            paymentDetails.getRazorpaySignature()
	    );

	    transaction.setPaymentDate(LocalDateTime.now());

	    paymentTransactionRepo.save(transaction);

	    rent.setStatus(RentStatus.PAID);
	    rent.setPaymentDate(LocalDate.now());

	    rentRepo.save(rent);

	    String message =
	            "Dear " + tenant.getUserDetails().getFirstName() + ",\n\n"
	            + "Your monthly rent payment has been successfully completed.\n\n"
	            + "Rent Payment Details:\n"
	            + "Rent ID: " + rent.getId() + "\n"
	            + "Rent Month: " + rent.getRentMonth() + "\n"
	            + "Amount Paid: ₹" + rent.getAmount() + "\n"
	            + "Payment Date: " + rent.getPaymentDate() + "\n"
	            + "Payment Status: PAID\n\n"
	            + "Thank you for choosing PGHub.\n\n"
	            + "Regards,\n"
	            + "PGHub Team";

	    emailService.sendEmail(
	            tenant.getUserDetails().getEmail(),
	            "PGHub - Rent Payment Successful",
	            message
	    );

	    return "Rent paid successfully";
	}

	@Override
	public List<RentResp> getRentDetails(Long pgId) {

		return rentRepo.findAllByProperty(pgId).stream().map(this::convertToResp).toList();
	}

}
