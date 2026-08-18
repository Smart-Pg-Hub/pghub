package com.backend.dto.req;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@AllArgsConstructor
@ToString
public class AouthUserReq {

	private String email;
	private String password;

}
