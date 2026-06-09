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
        if (updated.getSpecialization() != null) {
            doctor.setSpecialization(updated.getSpecialization());
        }
        if (updated.getExperienceYears() != null) {
            doctor.setExperienceYears(updated.getExperienceYears());
        }
        if (updated.getHospitalAffiliation() != null) {
            doctor.setHospitalAffiliation(updated.getHospitalAffiliation());
        }
        // Update user information if provided
        if (updated.getUser() != null) {
            if (updated.getUser().getName() != null) {
                doctor.getUser().setName(updated.getUser().getName());
            }
            if (updated.getUser().getEmail() != null) {
                doctor.getUser().setEmail(updated.getUser().getEmail());
            }
        }
        return doctorRepository.save(doctor);
    }

    public List<Appointment> getAppointments(Long doctorId) {
        return appointmentRepository.findByDoctorDoctorId(doctorId);
    }
}

