package com.backend.dto.response;

import com.backend.enums.AccpStatus;
import com.backend.enums.RoomType;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RoomResp {

    private Long id;
    private String roomNumber;
    private Integer roomCapacity;
    private Long amount;
    private Integer occupiedBeds;
    private Integer floorNumber;
    private Long securityDeposit;
    private Boolean active;
    private String description;
    private AccpStatus status;
}