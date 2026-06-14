package com.healthcare.services;

import com.healthcare.dto.AppointmentRequestDTO;
import com.healthcare.model.Appointment;
import com.healthcare.model.Doctor;
import com.healthcare.model.Patient;
import com.healthcare.repository.AppointmentRepository;
import com.healthcare.repository.DoctorRepository;
import com.healthcare.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AppointmentService {

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private DoctorRepository doctorRepository;

    public Appointment bookAppointment(AppointmentRequestDTO appointmentRequestDTO) {
        // Resolve IDs into managed entities
        Patient patient = patientRepository.findById(appointmentRequestDTO.getPatientId())
                .orElseThrow(() -> new RuntimeException("Patient not found"));
        Doctor doctor = doctorRepository.findById(appointmentRequestDTO.getDoctorId())
                .orElseThrow(() -> new RuntimeException("Doctor not found"));

        // Build Appointment entity
        Appointment appointment = new Appointment();
        appointment.setPatient(patient);
        appointment.setDoctor(doctor);
        appointment.setAppointmentDate(appointmentRequestDTO.getAppointmentDate());
        appointment.setStatus(appointmentRequestDTO.getStatus());
        return appointmentRepository.save(appointment);
    }

    public Appointment getAppointment(Long id) {
        return appointmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Appointment not found"));
    }

    public Appointment updateAppointment(Long id, Appointment updated) {
        Appointment appointment = getAppointment(id);
        appointment.setAppointmentDate(updated.getAppointmentDate());
        appointment.setStatus(updated.getStatus());
        return appointmentRepository.save(appointment);
    }

    public void cancelAppointment(Long id) {
        appointmentRepository.deleteById(id);
    }
}

