package com.datt.medicalrecordservice.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "medical_records")
public class MedicalRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String mediaHistory;
    private String symptoms;
    private String diagnosis;
    private String treatment;
    private String prescription;
    private String conclusion;
    private String doctorNote;
    private String testResults;
    private String attachments;

    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    @Enumerated(EnumType.STRING)
    private Status status;

    // ---- METHODS ----
    public void addDoctorNote(String note) {
        this.doctorNote = (this.doctorNote == null ? "" : this.doctorNote + "\n") + note;
    }

    public void addTestResult(String result) {
        this.testResults = (this.testResults == null ? "" : this.testResults + "\n") + result;
    }

    public void updateDiagnosis(String diag) {
        this.diagnosis = diag;
        this.updatedAt = LocalDateTime.now();
    }

    public void updateTreatment(String treat) {
        this.treatment = treat;
        this.updatedAt = LocalDateTime.now();
    }

    public void editRecord(String prescription, String conclusion) {
        this.prescription = prescription;
        this.conclusion = conclusion;
        this.updatedAt = LocalDateTime.now();
    }

    public void closeRecord() {
        this.status = Status.CLOSED;
        this.endTime = LocalDateTime.now();
    }

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        status = Status.ACTIVE;
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

    // Getters & Setters
    // (Bạn có thể dùng Lombok để rút gọn)
}
