package com.healthcare.controllers;

import com.healthcare.dto.AppointmentRequestDTO;
import com.healthcare.model.Appointment;
import com.healthcare.services.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/appointments")
public class AppointmentController {

    @Autowired
    private AppointmentService appointmentService;

    @PostMapping
    public ResponseEntity<Appointment> bookAppointment(@RequestBody AppointmentRequestDTO appointmentRequestDTO) {
        return ResponseEntity.ok(appointmentService.bookAppointment(appointmentRequestDTO));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Appointment> getAppointment(@PathVariable Long id) {
        return ResponseEntity.ok(appointmentService.getAppointment(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Appointment> updateAppointment(@PathVariable Long id, @RequestBody Appointment updated) {
        return ResponseEntity.ok(appointmentService.updateAppointment(id, updated));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> cancelAppointment(@PathVariable Long id) {
        appointmentService.cancelAppointment(id);
        return ResponseEntity.noContent().build();
    }
}

