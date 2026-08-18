package com.backend.dto.req;

import java.time.LocalDate;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RentReq {

	private Long bookingId;

	private Long tenantId;

	private Long amount;

	private LocalDate rentMonth;

	private LocalDate dueDate;

}
