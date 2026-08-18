package com.backend.dto.response;

import java.time.LocalDate;
import com.backend.enums.Role;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * One row in the admin "all users" table. activityCount means bookings
 * made for a TENANT, or properties listed for a PG_OWNER — null/0 for the
 * role that doesn't apply.
 */
@Getter
@Setter
@NoArgsConstructor
public class AdminUserActivity {
    private Long userId;
    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    private Role role;
    private LocalDate createdOn;
    private long activityCount;
}
