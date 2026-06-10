package com.healthcare.dto;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class DoctorRegisterRequest extends RegisterRequest {
    // Doctor specific fields
    private String specialization;
    private Integer experienceYears;
    private String hospitalAffiliation;
}

