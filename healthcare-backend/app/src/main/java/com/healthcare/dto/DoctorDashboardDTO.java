package com.healthcare.dto;

import lombok.Data;

@Data
public class DoctorDashboardDTO {
    private Long appointmentId;
    private String appointmentDate;   // ISO string
    private String appointmentTime;   // formatted time
    private String patientName;
    private String patientMedicalHistorySummary; // short summary or link
    private String paymentStatus;     // INITIATED, SUCCESS, FAILED, REFUNDED
}
