package com.healthcare.services;

@Service
public class PatientService {

    @Autowired private PatientRepository patientRepository;
    @Autowired private AppointmentRepository appointmentRepository;

    public Patient getPatient(Long id) {
        return patientRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Patient not found"));
    }

    public Patient updatePatient(Long id, Patient updated) {
        Patient patient = getPatient(id);
        patient.setName(updated.getName());
        patient.setEmail(updated.getEmail());
        return patientRepository.save(patient);
    }

    public List<Appointment> getAppointments(Long patientId) {
        return appointmentRepository.findByPatientId(patientId);
    }
}

