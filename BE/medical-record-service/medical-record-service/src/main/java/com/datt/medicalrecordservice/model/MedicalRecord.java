package com.datt.medicalrecordservice.model;

import lombok.Data;
import org.springframework.data.annotation.CreatedDate; // 1. Thêm import
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate; // 2. Thêm import
import org.springframework.data.mongodb.core.mapping.Document; // 3. Dùng @Document

import java.time.LocalDateTime;

@Data // 4. Dùng Lombok (thay cho Getters/Setters thủ công)
@Document(collection = "records") // 5. Tên "bảng" (collection) trong 'medical_db'
public class MedicalRecord {

    @Id
    private String id; // 6. MongoDB dùng String ID

    // (Theo sơ đồ của bạn, bạn cần các ID này để liên kết)
    private Long appointmentId;
    private Long patientId;
    private Long doctorId;

    // (Các trường này lấy từ code của bạn)
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

    @CreatedDate
    private LocalDateTime createdAt;

    @LastModifiedDate
    private LocalDateTime updatedAt;

    private Status status;
}