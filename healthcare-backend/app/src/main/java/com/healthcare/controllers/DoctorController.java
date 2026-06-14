package com.healthcare.controllers;

import com.healthcare.dto.DoctorProfileDTO;
import com.healthcare.model.Appointment;
import com.healthcare.model.Doctor;
import com.healthcare.services.DoctorService;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Log4j2
@RestController
@RequestMapping("/doctors")
public class DoctorController {

    @Autowired private DoctorService doctorService;

    @GetMapping
    public ResponseEntity<List<DoctorProfileDTO>> getAllDoctors(@RequestParam(required = false) String specialization) {
        if (specialization != null) {
            return ResponseEntity.ok(doctorService.findBySpecialization(specialization));
        }
        log.debug("REST request to get All Doctors : ");
        return ResponseEntity.ok(doctorService.getAllDoctors());
    }

    @GetMapping("/{id}")
    public ResponseEntity<DoctorProfileDTO> getDoctor(@PathVariable Long id) {
        log.debug("REST request to get Doctor : {}", id);
        DoctorProfileDTO doctorProfileDTO = doctorService.getDoctorProfile(id);
        log.debug("doctor : {}", doctorProfileDTO);
        return ResponseEntity.ok(doctorProfileDTO);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Doctor> updateDoctor(@PathVariable Long id, @RequestBody Doctor doctor) {
        return ResponseEntity.ok(doctorService.updateDoctor(id, doctor));
    }

    @GetMapping("/{id}/appointments")
    public ResponseEntity<List<Appointment>> getAppointments(@PathVariable Long id) {
        return ResponseEntity.ok(doctorService.getAppointments(id));
    }
}

