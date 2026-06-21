package com.healthcare.security;


import com.healthcare.model.Doctor;
import com.healthcare.model.Patient;
import com.healthcare.model.User;
import com.healthcare.repository.DoctorRepository;
import com.healthcare.repository.PatientRepository;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;
import java.util.Optional;

@Component
public class JwtUtil {

    @Autowired
    private PatientRepository patientRepository;
    
    @Autowired
    private DoctorRepository doctorRepository;

    private final String SECRET_KEY = "mysecretkey123456789012345678901234567890"; // at least 32 chars
    private final long EXPIRATION_TIME = 1000 * 60 * 60; // 1 hour

    private Key getSigningKey() {
        return Keys.hmacShaKeyFor(SECRET_KEY.getBytes());
    }

    public String generateToken(User user) {
        JwtBuilder builder = Jwts.builder()
                .setSubject(user.getEmail())
                .claim("role", user.getRole())
                .claim("userId", user.getId());
        
        // Add patientId or doctorId based on role
        if ("PATIENT".equalsIgnoreCase(user.getRole())) {
            Patient patient = patientRepository.findByUserId(user.getId());
            if (patient != null) {
                builder.claim("patientId", patient.getPatientId());
            }
        } else if ("DOCTOR".equalsIgnoreCase(user.getRole())) {
            Doctor doctor = doctorRepository.findByUserId(user.getId());
            if (doctor != null) {
                builder.claim("doctorId", doctor.getDoctorId());
            }
        }
        builder.claim("username", user.getName());
        
        return builder
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    public String extractUsername(String token) {
        return extractClaims(token).getSubject();
    }

    public boolean validateToken(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }

    private boolean isTokenExpired(String token) {
        return extractClaims(token).getExpiration().before(new Date());
    }

    private Claims extractClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
}

