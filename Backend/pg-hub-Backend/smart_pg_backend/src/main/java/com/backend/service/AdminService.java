package com.backend.service;

import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.backend.dto.response.AdminDashboardStats;
import com.backend.dto.response.AdminOwnerProperties;
import com.backend.dto.response.AdminOwnerProperties.PropertySummary;
import com.backend.dto.response.AdminUserActivity;
import com.backend.entity.Owner;
import com.backend.entity.Property;
import com.backend.entity.User;
import com.backend.enums.BookingStatus;
import com.backend.enums.ComplaintStatus;
import com.backend.enums.PaymentStatus;
import com.backend.enums.Role;
import com.backend.repository.BookingRepository;
import com.backend.repository.ComplaintRepository;
import com.backend.repository.OwnerRepository;
import com.backend.repository.PaymentTransactionRepository;
import com.backend.repository.PropertyRepository;
import com.backend.repository.ReviewsRepository;
import com.backend.repository.RoomRepository;
import com.backend.repository.TenantRepository;
import com.backend.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AdminService {

    private final UserRepository userRepository;
    private final TenantRepository tenantRepository;
    private final OwnerRepository pgOwnerRepository;
    private final PropertyRepository pgPropertyRepository;
    private final RoomRepository roomRepository;
    private final BookingRepository bookingRepository;
    private final ComplaintRepository complaintRepository;
    private final ReviewsRepository reviewRepository;
    private final PaymentTransactionRepository paymentRepository;

    @Transactional(readOnly = true)
    public AdminDashboardStats getDashboardStats() {

    	 AdminDashboardStats stats = new AdminDashboardStats();

    	    stats.setTotalTenants(tenantRepository.count());
    	    stats.setTotalOwners(pgOwnerRepository.count());
    	    stats.setTotalProperties(pgPropertyRepository.count());
    	    stats.setTotalRooms(roomRepository.count());
    	    stats.setTotalBookings(bookingRepository.count());

    	    stats.setPendingBookings(bookingRepository.countByStatus(BookingStatus.PENDING));
    	    stats.setConfirmedBookings(bookingRepository.countByStatus(BookingStatus.ACTIVE));
    	    stats.setCancelledBookings(bookingRepository.countByStatus(BookingStatus.CANCELLED));

    	    stats.setPaidRevenue(paymentRepository.sumAmountByStatus(PaymentStatus.PAID));
    	    stats.setPendingRevenue(paymentRepository.sumAmountByStatus(PaymentStatus.PENDING));

    	    stats.setOpenComplaints(complaintRepository.countByStatus(ComplaintStatus.PENDING));
    	    stats.setResolvedComplaints(complaintRepository.countByStatus(ComplaintStatus.RESOLVED));

    	    stats.setTotalReviews(reviewRepository.count());
    	    return stats;
    } 

    @Transactional(readOnly = true)
    public List<AdminUserActivity> getAllUserActivity() {

    	List<User> users = userRepository.findByRoleIn(
    	        List.of(Role.TENANT, Role.OWNER),
    	        Sort.by("id").descending()
    	);

        return users.stream().map(user -> {
            
            long activityCount = user.getRole() == Role.TENANT
                    ? bookingRepository.countByMyTenantId(user.getId())
                    : pgPropertyRepository.countByMyOwner_Id(user.getId());

            AdminUserActivity dto = new AdminUserActivity();

            dto.setUserId(user.getId());
            dto.setFirstName(user.getFirstName());
            dto.setLastName(user.getLastName());
            dto.setEmail(user.getEmail());
            dto.setPhone(user.getPhone());
            dto.setRole(user.getRole());
            dto.setCreatedOn(user.getCreatedOn());
            dto.setActivityCount(activityCount);

            return dto;

        }).toList();
    }

    @Transactional(readOnly = true)
    public List<AdminOwnerProperties> getOwnersWithProperties() {

        List<Owner> owners = pgOwnerRepository.findAll(Sort.by("id").descending());

        return owners.stream().map(owner -> {

            List<PropertySummary> properties = pgPropertyRepository
                    .findAllByMyOwner_Id(owner.getId())
                    .stream()
                    .map(this::toPropertySummary)
                    .toList();

            AdminOwnerProperties dto = new AdminOwnerProperties();

            dto.setOwnerId(owner.getId());
            dto.setOwnerName(
                    owner.getUserDetails().getFirstName()
                            + " "
                            + owner.getUserDetails().getLastName()
            );
            dto.setBusinessName(owner.getBusinessName());
            dto.setPropertyCount(properties.size());
            dto.setProperties(properties);

            return dto;

        }).toList();
    }
    

    private PropertySummary toPropertySummary(Property property) {

        PropertySummary summary = new PropertySummary();

        summary.setPgId(property.getId());
        summary.setName(property.getName());
        summary.setAddress(property.getAddress());
        summary.setTotalRooms(property.getTotalRooms());
        return summary;
    }
}