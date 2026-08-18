package com.backend.dto.req;

import com.backend.enums.PaymentMethod;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RentPaymentRequest {

    private Long rentId;

    private PaymentDetails paymentDetails; 
    private PaymentMethod paymentMethod;

}
