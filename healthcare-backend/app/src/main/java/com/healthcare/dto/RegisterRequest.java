package com.healthcare.dto;

import lombok.Data;

@Data
public class RegisterRequest {
    // User fields
    private String email;
    private String name;
    private String password;
    private String role; // "PATIENT" or "DOCTOR"
}

