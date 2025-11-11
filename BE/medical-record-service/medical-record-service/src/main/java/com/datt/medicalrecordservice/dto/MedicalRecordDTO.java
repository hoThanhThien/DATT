package com.datt.medicalrecordservice.dto;

import com.datt.medicalrecordservice.model.Status;
import java.time.LocalDateTime;

public class MedicalRecordDTO {
    private Long id;
    private String symptoms;
    private String diagnosis;
    private String treatment;
    private String prescription;
    private String conclusion;
    private String doctorNote;
    private String testResults;
    private Status status;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    // Constructors
    public MedicalRecordDTO() {}

    public MedicalRecordDTO(Long id, String symptoms, String diagnosis, String treatment,
                            String prescription, String conclusion, String doctorNote,
                            String testResults, Status status, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id;
        this.symptoms = symptoms;
        this.diagnosis = diagnosis;
        this.treatment = treatment;
        this.prescription = prescription;
        this.conclusion = conclusion;
        this.doctorNote = doctorNote;
        this.testResults = testResults;
        this.status = status;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    // Getters & Setters
    // (có thể dùng @Data của Lombok để rút gọn)
}
