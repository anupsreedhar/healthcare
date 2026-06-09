package com.healthcare.services;
import com.healthcare.model.Appointment;
import com.healthcare.model.Patient;
import com.healthcare.repository.AppointmentRepository;
import com.healthcare.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PatientService {

    @Autowired private PatientRepository patientRepository;
    @Autowired private AppointmentRepository appointmentRepository;

    public Patient getPatient(Long id) {
        return patientRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Patient not found"));
    }

    public Patient updatePatient(Long id, Patient updated) {
        Patient patient = getPatient(id);
        if (updated.getDateOfBirth() != null) {
            patient.setDateOfBirth(updated.getDateOfBirth());
        }
        if (updated.getGender() != null) {
            patient.setGender(updated.getGender());
        }
        if (updated.getAddress() != null) {
            patient.setAddress(updated.getAddress());
        }
        if (updated.getMedicalHistory() != null) {
            patient.setMedicalHistory(updated.getMedicalHistory());
        }
        if (updated.getInsuranceNumber() != null) {
            patient.setInsuranceNumber(updated.getInsuranceNumber());
        }
        // Update user information if provided
        if (updated.getUser() != null) {
            if (updated.getUser().getName() != null) {
                patient.getUser().setName(updated.getUser().getName());
            }
            if (updated.getUser().getEmail() != null) {
                patient.getUser().setEmail(updated.getUser().getEmail());
            }
        }
        return patientRepository.save(patient);
    }

    public List<Appointment> getAppointments(Long patientId) {
        return appointmentRepository.findByPatientPatientId(patientId);
    }
}

