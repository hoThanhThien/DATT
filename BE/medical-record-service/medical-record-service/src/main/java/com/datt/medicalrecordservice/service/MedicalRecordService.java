package com.datt.medicalrecordservice.service;

import com.datt.medicalrecordservice.model.MedicalRecord;
import com.datt.medicalrecordservice.model.Status;
import com.datt.medicalrecordservice.repository.MedicalRecordRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class MedicalRecordService {

    private final MedicalRecordRepository repository;

    public MedicalRecordService(MedicalRecordRepository repository) {
        this.repository = repository;
    }

    public List<MedicalRecord> getAllRecords() {
        return repository.findAll();
    }

    public Optional<MedicalRecord> getRecordById(Long id) {
        return repository.findById(id);
    }

    public MedicalRecord createRecord(MedicalRecord record) {
        return repository.save(record);
    }

    public MedicalRecord updateRecord(Long id, MedicalRecord updated) {
        return repository.findById(id)
                .map(record -> {
                    record.setSymptoms(updated.getSymptoms());
                    record.setDiagnosis(updated.getDiagnosis());
                    record.setTreatment(updated.getTreatment());
                    record.setPrescription(updated.getPrescription());
                    record.setConclusion(updated.getConclusion());
                    return repository.save(record);
                })
                .orElseThrow(() -> new RuntimeException("Record not found"));
    }

    public void deleteRecord(Long id) {
        repository.deleteById(id);
    }

    public List<MedicalRecord> getActiveRecords() {
        return repository.findByStatus(Status.ACTIVE);
    }

    public MedicalRecord closeRecord(Long id) {
        MedicalRecord record = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Record not found"));
        record.closeRecord();
        return repository.save(record);
    }
}
