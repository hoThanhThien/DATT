package com.datt.userservice.repository;

import com.datt.userservice.model.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PatientRepository extends JpaRepository<Patient, Long> {
    // Hiện tại chưa cần thêm hàm gì đặc biệt
    // JpaRepository đã cung cấp đủ (save, findById...)
}