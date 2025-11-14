package com.datt.medicalrecordservice.controller;

import com.datt.medicalrecordservice.model.MedicalRecord;
import com.datt.medicalrecordservice.service.MedicalRecordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/medical-records")
public class MedicalRecordController {

    @Autowired
    private MedicalRecordService medicalRecordService;

    // API 1: Bác sĩ tạo/cập nhật bệnh án (POST)
    @PostMapping
    public ResponseEntity<MedicalRecord> createOrUpdateRecord(@RequestBody MedicalRecord record) {
        MedicalRecord savedRecord = medicalRecordService.saveRecord(record);
        return ResponseEntity.ok(savedRecord);
    }

    // API 2: Lấy bệnh án của 1 lịch hẹn (GET)
    @GetMapping("/appointment/{appointmentId}")
    public ResponseEntity<MedicalRecord> getRecordByAppointment(@PathVariable Long appointmentId) {
        try {
            return ResponseEntity.ok(medicalRecordService.getRecordByAppointmentId(appointmentId));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // API 3: Lấy toàn bộ bệnh án của 1 bệnh nhân (GET)
    @GetMapping("/patient/{patientId}")
    public ResponseEntity<List<MedicalRecord>> getRecordsByPatient(@PathVariable Long patientId) {
        return ResponseEntity.ok(medicalRecordService.getRecordsByPatientId(patientId));
    }
}