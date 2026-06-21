package com.healthcare.repository;

import com.healthcare.model.Payment;
import org.springframework.data.jpa.repository.JpaRepository;


import java.util.List;


public interface PaymentRepository extends JpaRepository<Payment, Long> {

    // Find all payments for a given patient
    List<Payment> findByPatient_PatientId(Long patientId);

    // Find all payments for a given doctor
    List<Payment> findByDoctor_DoctorId(Long doctorId);

    // Find payments linked to an appointment
    List<Payment> findByAppointment_AppointmentId(Long appointmentId);
}
