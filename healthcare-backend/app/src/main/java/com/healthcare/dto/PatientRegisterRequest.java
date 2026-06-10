package com.healthcare.dto;

import lombok.Data;
import lombok.EqualsAndHashCode;

import java.time.LocalDate;

@Data
@EqualsAndHashCode(callSuper = true)
public class PatientRegisterRequest extends RegisterRequest {
    // Patient specific fields
    private LocalDate dateOfBirth;
    private String gender;
    private String address;
    private String medicalHistory;
    private String insuranceNumber;
}

