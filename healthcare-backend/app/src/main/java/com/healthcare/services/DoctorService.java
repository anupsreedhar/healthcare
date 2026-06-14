package com.healthcare.services;

import com.healthcare.dto.DoctorProfileDTO;
import com.healthcare.model.Appointment;
import com.healthcare.model.Doctor;
import com.healthcare.repository.AppointmentRepository;
import com.healthcare.repository.DoctorRepository;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Log4j2
@Service
public class DoctorService {

    @Autowired private DoctorRepository doctorRepository;
    @Autowired private AppointmentRepository appointmentRepository;

    public List<DoctorProfileDTO> getAllDoctors() {
        List<Doctor> doctors = doctorRepository.findAll();
        log.debug("REST request to get all Doctors : {} ", doctors);
        return doctors.stream()
                .map(DoctorProfileDTO::new) // convert each Doctor to DTO
                .collect(Collectors.toList());
    }

    public List<DoctorProfileDTO> findBySpecialization(String specialization) {
         List<Doctor> doctors = doctorRepository.findBySpecialization(specialization);
        log.debug("REST request to get all Doctors : {} {} ", doctors,specialization);
        return doctors.stream()
                .map(DoctorProfileDTO::new) // convert each Doctor to DTO
                .collect(Collectors.toList());
    }

    public Doctor getDoctor(Long id) {
        log.debug("REST request to get Doctor in DoctorService: {}", id);
        return doctorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Doctor not found"));
    }

    public DoctorProfileDTO getDoctorProfile(Long id) {
        Doctor doctor = doctorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Doctor not found"));
        return new DoctorProfileDTO(doctor);
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

