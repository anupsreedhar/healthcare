package com.healthcare.dto;

import com.healthcare.model.Doctor;
import lombok.Data;

import java.time.LocalDate;

@Data
public class DoctorProfileDTO {
    private Long id;
    private String name;
    private String email;
    private String specialization;
    private int experienceYears;
    private String hospitalAffiliation;
    private String address;
    private LocalDate dateOfBirth;
    private String gender;

    public DoctorProfileDTO(Doctor doctor) {
        this.id = doctor.getDoctorId();
        this.name = doctor.getUser() != null ?doctor.getUser().getName() : null;
        this.email = doctor.getUser() != null ?doctor.getUser().getEmail() : null;
        this.specialization = doctor.getSpecialization();
        this.experienceYears = doctor.getExperienceYears();
        this.hospitalAffiliation = doctor.getHospitalAffiliation();
        this.dateOfBirth = doctor.getDateOfBirth();
        this.gender = doctor.getGender();
    }
}
