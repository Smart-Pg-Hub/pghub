package com.backend.dto.response;

import lombok.Getter;

import lombok.NoArgsConstructor;
import lombok.Setter;

/** Platform-wide statistics shown on the admin dashboard. */
@Getter
@Setter
@NoArgsConstructor
public class AdminDashboardStats {
    private long totalTenants;
    private long totalOwners;
    private long totalProperties;
    private long totalRooms;

    private long totalBookings;
    private long pendingBookings;
    private long confirmedBookings;
    private long cancelledBookings;

    private long paidRevenue;
    private long pendingRevenue;

    private long openComplaints;
    private long resolvedComplaints;

    private long totalReviews;
}
