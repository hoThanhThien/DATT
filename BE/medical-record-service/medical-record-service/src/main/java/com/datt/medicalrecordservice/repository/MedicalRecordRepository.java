package com.datt.medicalrecordservice.repository;

import com.datt.medicalrecordservice.model.MedicalRecord;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
// 1. Kế thừa từ MongoRepository (không phải JpaRepository)
// 2. ID của MedicalRecord là String (không phải Long)
public interface MedicalRecordRepository extends MongoRepository<MedicalRecord, String> {

    // Tự động tạo hàm tìm lịch sử bệnh án theo Bệnh nhân
    List<MedicalRecord> findByPatientId(Long patientId);

    // Tự động tạo hàm tìm bệnh án theo Lịch hẹn
    Optional<MedicalRecord> findByAppointmentId(Long appointmentId);
}