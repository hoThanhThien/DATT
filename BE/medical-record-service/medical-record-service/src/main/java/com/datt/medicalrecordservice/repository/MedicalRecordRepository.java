package com.datt.medicalrecordservice.repository;

import com.datt.medicalrecordservice.model.MedicalRecord;
import com.datt.medicalrecordservice.model.Status;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface MedicalRecordRepository extends JpaRepository<MedicalRecord, Long> {
    List<MedicalRecord> findByStatus(Status status);
}
