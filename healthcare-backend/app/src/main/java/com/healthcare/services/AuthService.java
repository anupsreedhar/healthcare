package com.healthcare.services;

import com.healthcare.dto.DoctorRegisterRequest;
import com.healthcare.dto.PatientRegisterRequest;
import com.healthcare.dto.RegisterRequest;
import com.healthcare.model.Doctor;
import com.healthcare.model.Patient;
import com.healthcare.model.User;
import com.healthcare.repository.DoctorRepository;
import com.healthcare.repository.PatientRepository;
import com.healthcare.repository.UserRepository;
import com.healthcare.security.JwtUtil;

import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Log4j2
@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PatientRepository patientRepository;
    @Autowired
    private DoctorRepository doctorRepository;
    @Autowired private PasswordEncoder passwordEncoder;
    @Autowired private JwtUtil jwtUtil;

    public User registerPatient(PatientRegisterRequest request) {
        // Create and save User
        User user = new User();
        user.setEmail(request.getEmail());
        user.setName(request.getName());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole("PATIENT");
        User savedUser = userRepository.save(user);

        // Create and save Patient with additional fields
        Patient patient = new Patient();
        patient.setUser(savedUser);
        patient.setDateOfBirth(request.getDateOfBirth());
        patient.setGender(request.getGender());
        patient.setAddress(request.getAddress());
        patient.setMedicalHistory(request.getMedicalHistory());
        patient.setInsuranceNumber(request.getInsuranceNumber());
        patientRepository.save(patient);

        return savedUser;
    }

    public User registerDoctor(DoctorRegisterRequest request) {
        // Create and save User
        User user = new User();
        user.setEmail(request.getEmail());
        user.setName(request.getName());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole("DOCTOR");
        User savedUser = userRepository.save(user);

        // Create and save Doctor with additional fields
        Doctor doctor = new Doctor();
        doctor.setUser(savedUser);
        doctor.setSpecialization(request.getSpecialization() != null ? request.getSpecialization() : "General");
        doctor.setExperienceYears(request.getExperienceYears());
        doctor.setHospitalAffiliation(request.getHospitalAffiliation());
        doctorRepository.save(doctor);

        return savedUser;
    }

    // Generic registration method for backward compatibility
    public User register(RegisterRequest request) {
        if ("PATIENT".equalsIgnoreCase(request.getRole())) {
            throw new RuntimeException("Please use /auth/register/patient endpoint with patient details");
        } else if ("DOCTOR".equalsIgnoreCase(request.getRole())) {
            throw new RuntimeException("Please use /auth/register/doctor endpoint with doctor details");
        }

        throw new RuntimeException("Invalid role. Must be PATIENT or DOCTOR");
    }

    public String login(String email, String password) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }

          return jwtUtil.generateToken(user);
    }
}

