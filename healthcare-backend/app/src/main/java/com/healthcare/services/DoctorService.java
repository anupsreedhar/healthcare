package com.healthcare.services;

import com.healthcare.dto.DoctorDashboardDTO;
import com.healthcare.dto.DoctorProfileDTO;
import com.healthcare.model.Appointment;
import com.healthcare.model.Doctor;
import com.healthcare.model.Payment;
import com.healthcare.repository.AppointmentRepository;
import com.healthcare.repository.DoctorRepository;
import com.healthcare.repository.PaymentRepository;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Log4j2
@Service
public class DoctorService {

    private final DoctorRepository doctorRepository;
    private final AppointmentRepository appointmentRepository;
    private final PaymentRepository paymentRepository;


    public DoctorService(DoctorRepository doctorRepository,
                        AppointmentRepository appointmentRepository,
                        PaymentRepository paymentRepository) {
        this.doctorRepository = doctorRepository;
        this.appointmentRepository = appointmentRepository;
        this.paymentRepository = paymentRepository;
    }

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

    public List<DoctorDashboardDTO> getDoctorDashboard(Long doctorId) {
        List<Appointment> appointments = appointmentRepository.findByDoctorDoctorId(doctorId);

        return appointments.stream().map(appt -> {
            DoctorDashboardDTO dto = new DoctorDashboardDTO();
            dto.setAppointmentId(appt.getAppointmentId());
            dto.setAppointmentDate(appt.getAppointmentDate().toLocalDate().toString());
            dto.setAppointmentTime(appt.getAppointmentDate().toLocalTime().toString());
            dto.setPatientName(appt.getPatient().getUser().getName());
            dto.setPatientMedicalHistorySummary(appt.getPatient().getMedicalHistory());

            Payment payment = paymentRepository.findByAppointment_AppointmentId(appt.getAppointmentId())
                    .stream().findFirst().orElse(null);
            dto.setPaymentStatus(payment != null ? payment.getStatus() : "Pending");

            return dto;
        }).collect(Collectors.toList());
    }
}

