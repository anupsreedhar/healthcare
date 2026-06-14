-- Drop tables in reverse dependency order
DROP TABLE IF EXISTS appointments CASCADE;
DROP TABLE IF EXISTS doctor CASCADE;
DROP TABLE IF EXISTS patient CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- Base user table for authentication and role
CREATE TABLE users (
                       id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
                       email VARCHAR(150) NOT NULL UNIQUE,   -- used as username
                       name VARCHAR(100) NOT NULL,
                       password VARCHAR(255) NOT NULL,       -- store raw or hashed password
                       role VARCHAR(20) NOT NULL CHECK (role IN ('DOCTOR', 'PATIENT')),
                       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Doctor table extending users
CREATE TABLE doctor (
                        id BIGINT PRIMARY KEY,
                        specialization VARCHAR(100) NOT NULL,
                        experience_years INT,
                        hospital_affiliation VARCHAR(150),
                        FOREIGN KEY (id) REFERENCES users(id) ON DELETE CASCADE
);

-- Patient table extending users
CREATE TABLE patient (
                         id BIGINT PRIMARY KEY,
                         date_of_birth DATE,
                         gender VARCHAR(20),
                         address VARCHAR(255),
                         medical_history TEXT,
                         insurance_number VARCHAR(100),
                         FOREIGN KEY (id) REFERENCES users(id) ON DELETE CASCADE
);

-- Appointment table linking doctors and patients
CREATE TABLE appointments (
                              id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
                              appointment_date TIMESTAMP NOT NULL,
                              status VARCHAR(20) NOT NULL CHECK (status IN ('BOOKED','COMPLETED','CANCELLED')),
                              doctor_id BIGINT NOT NULL,
                              patient_id BIGINT NOT NULL,
                              FOREIGN KEY (doctor_id) REFERENCES doctor(id) ON DELETE CASCADE,
                              FOREIGN KEY (patient_id) REFERENCES patient(id) ON DELETE CASCADE
);

-- ===========================
-- Payment Table
-- ===========================
CREATE TABLE payment (
                         payment_id BIGSERIAL PRIMARY KEY,
                         appointment_id BIGINT NOT NULL,
                         patient_id BIGINT NOT NULL,
                         doctor_id BIGINT NOT NULL,
                         amount NUMERIC(10,2) NOT NULL,
                         currency VARCHAR(10) DEFAULT 'INR',
                         status VARCHAR(20) NOT NULL, -- e.g. INITIATED, SUCCESS, FAILED, REFUNDED
                         transaction_reference VARCHAR(100), -- gateway/mock reference
                         created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                         updated_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

                         CONSTRAINT fk_payment_appointment FOREIGN KEY (appointment_id) REFERENCES appointment(appointment_id),
                         CONSTRAINT fk_payment_patient FOREIGN KEY (patient_id) REFERENCES patient(patient_id),
                         CONSTRAINT fk_payment_doctor FOREIGN KEY (doctor_id) REFERENCES doctor(doctor_id)
);

-- ===========================
-- Payment Audit Table
-- ===========================
CREATE TABLE payment_audit (
                               audit_id BIGSERIAL PRIMARY KEY,
                               payment_id BIGINT NOT NULL,
                               request_payload TEXT,   -- raw JSON/XML request
                               response_payload TEXT,  -- raw JSON/XML response
                               status_code INT,
                               message VARCHAR(255),
                               timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

                               CONSTRAINT fk_audit_payment FOREIGN KEY (payment_id) REFERENCES payment(payment_id)
);
