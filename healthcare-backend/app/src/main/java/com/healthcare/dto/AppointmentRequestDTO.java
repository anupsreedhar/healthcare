package com.healthcare.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class AppointmentRequestDTO {
    private Long patientId;
    private Long doctorId;
    private LocalDateTime appointmentDate;
    private String status;
}
