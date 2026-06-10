package com.healthcare.controllers;

import com.healthcare.dto.DoctorRegisterRequest;
import com.healthcare.dto.PatientRegisterRequest;
import com.healthcare.model.User;
import com.healthcare.services.AuthService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/auth")
@Tag(name = "Authentication", description = "User authentication and registration endpoints")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/register/patient")
    @Operation(summary = "Register a new patient", description = "Create a new patient account with personal details")
    public ResponseEntity<User> registerPatient(@RequestBody PatientRegisterRequest request) {
        return ResponseEntity.ok(authService.registerPatient(request));
    }

    @PostMapping("/register/doctor")
    @Operation(summary = "Register a new doctor", description = "Create a new doctor account with professional details")
    public ResponseEntity<User> registerDoctor(@RequestBody DoctorRegisterRequest request) {
        return ResponseEntity.ok(authService.registerDoctor(request));
    }

    @PostMapping("/login")
    @Operation(summary = "Login", description = "Authenticate user and receive JWT token")
    public ResponseEntity<Map<String, String>> login(@RequestBody Map<String, String> request) {
        String token = authService.login(request.get("email"), request.get("password"));
        return ResponseEntity.ok(Map.of("token", token));
    }
}
