package com.backend.dto.response;

import lombok.Getter;

import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

import com.backend.entity.Address;

/** One PG owner and a lightweight summary of every property they list. */
@Getter
@Setter
@NoArgsConstructor
public class AdminOwnerProperties {
    private Long ownerId;
    private String ownerName;
    private String email;
    private String businessName;
    private long propertyCount;
    private List<PropertySummary> properties;

    @Getter
    @Setter
    @NoArgsConstructor
    public static class PropertySummary {
        private Long pgId;
        private String name;
        private Address address;
        private Integer totalRooms;
        private Integer monthlyRentBase;
    }
}
 