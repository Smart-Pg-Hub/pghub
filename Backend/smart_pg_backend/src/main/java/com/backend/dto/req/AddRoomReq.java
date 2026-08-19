package com.backend.dto.req;
import jakarta.validation.constraints.Min;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class AddRoomReq {

	    private Long pgId;

	    private String roomNumber;

	    @Min(value = 1, message = "RoomController capacity must be at least 1")
	    private Integer roomCapacity;

	    private Long amount;

	    private Integer floorNumber;

	    private Long securityDeposit;

	    private String description;
}