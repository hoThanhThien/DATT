package com.datt.medicalrecordservice.service;

import com.datt.medicalrecordservice.model.MedicalRecord;
import com.datt.medicalrecordservice.model.Status;
import com.datt.medicalrecordservice.repository.MedicalRecordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MedicalRecordService {

    @Autowired
    private MedicalRecordRepository medicalRecordRepository;

    // Bác sĩ tạo/cập nhật bệnh án
    public MedicalRecord saveRecord(MedicalRecord record) {
        // (Service này không cần @CreationTimestamp hay @LastModifiedDate,
        // vì @EnableMongoAuditing đã tự động xử lý chúng)
        return medicalRecordRepository.save(record);
    }

    // Lấy bệnh án theo ID lịch hẹn
    public MedicalRecord getRecordByAppointmentId(Long appointmentId) {
        return medicalRecordRepository.findByAppointmentId(appointmentId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy bệnh án cho lịch hẹn ID: " + appointmentId));
    }

    // Lấy tất cả bệnh án của một bệnh nhân
    public List<MedicalRecord> getRecordsByPatientId(Long patientId) {
        return medicalRecordRepository.findByPatientId(patientId);
    }

    // Đóng bệnh án
    public MedicalRecord closeRecord(String recordId) {
        MedicalRecord record = medicalRecordRepository.findById(recordId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy bệnh án ID: " + recordId));

        record.setStatus(Status.CLOSED);
        return medicalRecordRepository.save(record);
    }
}