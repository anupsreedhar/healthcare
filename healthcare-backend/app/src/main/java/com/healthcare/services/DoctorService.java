package com.healthcare.services;

import com.healthcare.model.Appointment;
import com.healthcare.model.Doctor;
import com.healthcare.repository.AppointmentRepository;
import com.healthcare.repository.DoctorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class DoctorService {

    @Autowired private DoctorRepository doctorRepository;
    @Autowired private AppointmentRepository appointmentRepository;

    public List<Doctor> getAllDoctors() {
        return doctorRepository.findAll();
    }

    public List<Doctor> findBySpecialization(String specialization) {
        return doctorRepository.findBySpecialization(specialization);
    }

    public Doctor getDoctor(Long id) {
        return doctorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Doctor not found"));
    }

    public Doctor updateDoctor(Long id, Doctor updated) {
        Doctor doctor = getDoctor(id);
        doctor.setName(updated.getName());
        doctor.setSpecialization(updated.getSpecialization());
        return doctorRepository.save(doctor);
    }

    public List<Appointment> getAppointments(Long doctorId) {
        return appointmentRepository.findByDoctorId(doctorId);
    }
}

