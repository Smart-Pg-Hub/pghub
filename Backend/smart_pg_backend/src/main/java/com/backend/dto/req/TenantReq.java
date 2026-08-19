package com.backend.dto.req;

import java.time.LocalDate;

import com.backend.enums.IdProof;
import com.backend.enums.Role;
import com.backend.enums.TenantCategory;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@RequiredArgsConstructor 
public class TenantReq {
	private Long userId;
	private String guardianNumber;
	private LocalDate joiningDate;
	private TenantCategory category;

}
 