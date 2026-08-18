package com.backend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class PropertyDetailsResp {
	
	private Integer totalRooms;
    private Integer totalBeds;
    private Integer occupiedBeds;
    private Integer availableBeds;
    private Long monthlyRevenue;

}
