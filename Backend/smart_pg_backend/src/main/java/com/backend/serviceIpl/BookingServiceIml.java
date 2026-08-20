package com.backend.serviceIpl;

import java.time.LocalDate;




import java.time.LocalDateTime;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.backend.customException.AlreadyExistsException;
import com.backend.customException.ResourceNotFoundException;
import com.backend.dto.req.BookingReq;
import com.backend.dto.response.BookingResp;
import com.backend.dto.response.BookingSumaryResp;
import com.backend.dto.req.PaymentDetails;
import com.backend.dto.response.PropertyResponse;
import com.backend.dto.response.RentResp;
import com.backend.dto.response.TenantPgResponse;
import com.backend.dto.response.TenantRoomResponse;
import com.backend.dto.response.TenatnDeatailsResp;
import com.backend.entity.Booking;
import com.backend.entity.Owner;
import com.backend.entity.PaymentTransaction;
import com.backend.entity.Property;
import com.backend.entity.Rent;
import com.backend.entity.Room;
import com.backend.entity.Tenant;
import com.backend.entity.User;
import com.backend.enums.AccpStatus;
import com.backend.enums.BookingStatus;
import com.backend.enums.CheckoutAction;
import com.backend.enums.CheckoutStatus;
import com.backend.enums.PaymentStatus;
import com.backend.enums.PaymentType;
import com.backend.enums.RentStatus;
import com.backend.repository.BookingRepository;
import com.backend.repository.OwnerRepository;
import com.backend.repository.PaymentTransactionRepository;
import com.backend.repository.RentRepository;
//import com.backend.repository.PaymentRepository;
import com.backend.repository.RoomRepository;
import com.backend.repository.TenantRepository;
import com.backend.repository.UserRepository;
import com.backend.service.BookingService;
import com.backend.service.EmailService;
import com.backend.service.RentService;
import com.backend.util.RentCalculationUtil;

import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class BookingServiceIml implements BookingService {

	private final BookingRepository bookRepo;
	private final RoomRepository roomRepo;
	private final TenantRepository tenantRepo;
	private final PaymentTransactionRepository paymentTransactionRepo;
	private final RentRepository rentRepo;
	private final OwnerRepository ownerRepo;
	private final RentService rentService; 
	private final EmailService emailService;
	private final ModelMapper mapper;
	
	 
	
	@Override
	public Object validateBooking(Long roomId, Long userId) {
	    Tenant tenant = tenantRepo.findById(userId) 
	            .orElseThrow(() -> new ResourceNotFoundException("Tenant not found"));
	    Room room = roomRepo.findById(roomId)
	            .orElseThrow(() -> new ResourceNotFoundException("Room is not found"));
	    if (room.getOccupiedBeds() >= room.getRoomCapacity()) {
	        throw new RuntimeException("RoomController is Full");
	    }

	    if (bookRepo.existsByMyTenantIdAndStatus(userId, BookingStatus.BOOKED)) {
	        throw new AlreadyExistsException("Tenant already has an active booking");
	    }
	    return "Procedd To Pay"; 
	}
	
	@Override
	public BookingSumaryResp getBookingSummary(Long roomId)
	{
		   Room room = roomRepo.findById(roomId)
				   .orElseThrow(()->new ResourceNotFoundException("RoomController not found"));
		    
		    LocalDate bookingDate = LocalDate.now();
		    Long firstMonthRent = RentCalculationUtil.calculateProratedRent(room.getAmount(),bookingDate);
		    BookingSumaryResp response = new BookingSumaryResp();
		    response.setRoomId(room.getId());
		    response.setRoomNumber(room.getRoomNumber());
		    response.setPropertyName(room.getPgProperty().getName());
		    response.setMonthlyRent(room.getAmount());
		    response.setFirstMonthRent(firstMonthRent);
		    response.setSecurityDeposit(room.getSecurityDeposit());
		    response.setTotalAmount(firstMonthRent +room.getSecurityDeposit());
		    return response;
	}
	@Override
	@Transactional
	public BookingResp roomBook(BookingReq request, Long tenantId) 
	{
		PaymentDetails paymentDetails = request.getPaymentDetails(); 
	    // 2. Get RoomController
	    Room room = roomRepo.findById(request.getRoomId())
	            .orElseThrow(() -> new ResourceNotFoundException("RoomController not found"));
	    
	    // 1. Get Tenant
	    Tenant tenant = tenantRepo.findById(tenantId)
	            .orElseThrow(() -> new ResourceNotFoundException("Tenant not found"));

	    // 3. Check room availability
	    if (room.getOccupiedBeds() >= room.getRoomCapacity()) {
	        throw new RuntimeException("Room is Full");
	    }

	    // 4. Check existing active booking
	    if (bookRepo.existsByMyTenantIdAndStatus(tenantId, BookingStatus.BOOKED)) {
	        throw new AlreadyExistsException("Tenant already has an active booking");
	    }

	    // 5. Update room occupancy
	    room.setOccupiedBeds(room.getOccupiedBeds() + 1);

	    if (room.getOccupiedBeds().equals(room.getRoomCapacity())) {
	        room.setStatus(AccpStatus.FULL);
	    } else {
	        room.setStatus(AccpStatus.AVAILABLE);
	    }

	    roomRepo.save(room);

	    Booking booking = new Booking();

	    booking.setMyTenant(tenant);
	    booking.setMyRoom(room);
	    booking.setBookedOn(LocalDate.now());
	    booking.setJoiningDate(request.getJoiningDate());
	    booking.setDuration(request.getDuration());
	    booking.setSecurityDeposit(room.getSecurityDeposit());
	    booking.setStatus(BookingStatus.BOOKED);

	    Booking savedBooking = bookRepo.save(booking);

	    PaymentTransaction transaction = paymentTransactionRepo
	            .findByRazorpayOrderId(paymentDetails.getRazorpayOrderId())
	            .orElseThrow(() -> new RuntimeException("Payment not found"));

	    transaction.setBooking(savedBooking);
	    transaction.setPaymentMethod(request.getPaymentMethod());
	    transaction.setPaymentDate(LocalDateTime.now());

	    paymentTransactionRepo.save(transaction);


	    LocalDate bookingDate = LocalDate.now();
	    long firstMonthRent = RentCalculationUtil.calculateProratedRent(room.getAmount(), bookingDate);

	    Rent rent = new Rent();

	    rent.setBooking(savedBooking);
	    rent.setTenant(tenant);

	    rent.setAmount(firstMonthRent);
	    rent.setStatus(RentStatus.PAID);

	    rent.setPaymentDate(LocalDate.now());

	    rent.setDueDate(
	            RentCalculationUtil.getLastDateOfMonth(
	                    request.getJoiningDate()));

	    rent.setRentMonth(
	            request.getJoiningDate().withDayOfMonth(1));

	    rentRepo.save(rent);
	    
	    Long totalAmount= savedBooking.getSecurityDeposit()+firstMonthRent;
	    
	    String message = 
	            "Dear " + tenant.getUserDetails().getFirstName() + ",\n\n"
	            + "Your booking has been confirmed successfully.\n\n"
	            + "Booking ID: " + savedBooking.getId() + "\n"
	            + "Security Deposit: ₹" + savedBooking.getSecurityDeposit() + "\n"
	            + "First Month Rent: ₹" + firstMonthRent + "\n"
	            + "Total Amount: ₹" + totalAmount + "\n\n"
	            + "Thank you for choosing PGHub.\n\n"
	            + "Regards,\n"
	            + "PGHub Team";

	    emailService.sendEmail(
	            tenant.getUserDetails().getEmail(),
	            "Booking Confirmed",
	            message
	    );
	    return mapper.map(savedBooking, BookingResp.class);
	}

	@Override
	public List<TenatnDeatailsResp> getAllTenantsByProperty(Long pgId) {

	     // Step 1: Get bookings from database
	    List<Booking> bookings =bookRepo.getAllTenantsByProperty(pgId, BookingStatus.BOOKED);

	    // Step 2: Convert Booking -> TenatnDeatailsResp using Stream API
	    List<TenatnDeatailsResp> response = bookings.stream()
	            .map(booking -> {
	            	
	                TenatnDeatailsResp dto = new TenatnDeatailsResp();
	                dto.setBookingId(booking.getId());
	                dto.setBookingStatus(booking.getStatus());
	                dto.setCheckoutStatus(booking.getCheckoutStatus());
	                Tenant tenant = booking.getMyTenant();
	                dto.setTenantId(tenant.getId());
	                User user = tenant.getUserDetails();
	                dto.setFirstName(user.getFirstName());
	                dto.setLastName(user.getLastName());
	                dto.setPhone(user.getPhone());
	                Room room = booking.getMyRoom();
	                dto.setRoomNumber(room.getRoomNumber());
	                dto.setFloorNumber(room.getFloorNumber());
	                dto.setMonthlyRent(room.getAmount());
	                dto.setRoomCapacity(room.getRoomCapacity());
	                Property property = room.getPgProperty();
	                dto.setPropertyName(property.getName());
	                dto.setJoiningDate(booking.getJoiningDate());
	                return dto;
	            })
	            .toList();
	    return response;
	}
	
	@Override
	@Transactional
	public String checkoutRequest(Long bookingId, Long userId) {

	    // Verify tenant
	    Tenant tenant = tenantRepo.findById(userId)
	            .orElseThrow(() ->new ResourceNotFoundException("Tenant not found"));

	    // Find booking
	    Booking booking = bookRepo.findById(bookingId)
	            .orElseThrow(() ->
	                    new ResourceNotFoundException("Booking not found"));

	    // Verify booking belongs to this tenant
	    if (!booking.getMyTenant() .getId().equals(tenant.getId())) {
 
	        throw new RuntimeException("You are not authorized to request checkout for this booking");
	    }

	    // Booking must be active
	    if (booking.getStatus() != BookingStatus.BOOKED) {
	        throw new RuntimeException(
	                "Only active bookings can request checkout");
	    }

	    // Prevent duplicate request
	    if (booking.getCheckoutStatus() == CheckoutStatus.REQUESTED) {
	        throw new RuntimeException(
	                "Checkout request already submitted");
	    }

	    // Prevent checkout after already completed
	    if (booking.getCheckoutStatus() == CheckoutStatus.APPROVED) {
	        throw new RuntimeException(
	                "Booking is already checked out");
	    }

	    // Create checkout request
	    booking.setCheckoutStatus(CheckoutStatus.REQUESTED);
//	    booking.setCheckoutRequestedDate(LocalDate.now());

	    bookRepo.save(booking);

	    return "Checkout request submitted successfully";
	}


	@Override
	@Transactional
	public String checkoutAction( Long bookingId,Long userId,CheckoutAction action) {

	    Owner owner = ownerRepo.findById(userId)
	            .orElseThrow(() ->
	                    new ResourceNotFoundException("Owner not found"));

	    Booking booking = bookRepo.findById(bookingId)
	            .orElseThrow(() ->
	                    new ResourceNotFoundException("Booking not found"));

	    if (booking.getStatus() != BookingStatus.BOOKED) {
	        throw new RuntimeException(
	                "Only active bookings can have checkout requests");
	    }

	    if (booking.getCheckoutStatus() != CheckoutStatus.REQUESTED) {
	        throw new RuntimeException(
	                "No checkout request found");
	    }

	    if (action == CheckoutAction.REJECT) {

	        booking.setCheckoutStatus(CheckoutStatus.REJECTED);

	        bookRepo.save(booking);

	        return "Checkout request rejected successfully";
	    }

	    // APPROVE

	    Room room = booking.getMyRoom();

	    booking.setCheckoutStatus(CheckoutStatus.APPROVED);
	    booking.setStatus(BookingStatus.CHECKED_OUT);
	    booking.setCheckoutDate(LocalDate.now());

	    if (room.getOccupiedBeds() > 0) {
	        room.setOccupiedBeds(room.getOccupiedBeds() - 1);
	    }

	    if (room.getOccupiedBeds() < room.getRoomCapacity()) {
	        room.setStatus(AccpStatus.AVAILABLE);
	    }

	    roomRepo.save(room);
	    bookRepo.save(booking);

	    return "Checkout completed successfully";
	}
	
	@Override
	public TenantPgResponse getMyPgDetails(Authentication authentication) {

		Long userId = (Long) authentication.getPrincipal();

	    Tenant tenant = tenantRepo.findById(userId)
	            .orElseThrow(() -> new RuntimeException("Tenant not found"));

	    Booking booking = bookRepo.findByMyTenantIdAndStatus(tenant.getId(),BookingStatus.BOOKED)
	            .orElseThrow(() -> new RuntimeException("No Active Booking"));

	    Room room = booking.getMyRoom(); 
	    Property property = room.getPgProperty(); 
	    TenantPgResponse dto = new TenantPgResponse();

	    dto.setProperty(mapper.map(property, PropertyResponse.class));
	    dto.setOwnerName(property.getMyOwner().getUserDetails().getFirstName());
	    dto.setRoomNumber(room.getRoomNumber());
	    dto.setRoomType(room.getRoomCapacity());
	    dto.setMonthlyRent(room.getAmount());
	    dto.setBookingId(booking.getId());
	    dto.setBookingStatus(booking.getStatus().name());

	    return dto;
	}


	@Override
	public TenantRoomResponse getMyRoomDetails(Authentication authentication) {
		
		Long userId = (Long) authentication.getPrincipal();
		Tenant tenant = tenantRepo.findById(userId)
		        .orElseThrow(() -> new RuntimeException("Tenant not found"));

		Booking booking = bookRepo.findByMyTenantIdAndStatus(
		        tenant.getId(),
		        BookingStatus.BOOKED
		).orElseThrow(() -> new RuntimeException("No Booking Found"));

		Room room = booking.getMyRoom();
		TenantRoomResponse dto = mapper.map(room,TenantRoomResponse.class);
		dto.setCheckoutStatus(booking.getCheckoutStatus());
		dto.setBookingId(booking.getId());
		return dto;
		
	}
}