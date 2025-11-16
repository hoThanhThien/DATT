import api from './api';

/**
 * Medical Record Service - Quản lý API liên quan đến Bệnh án
 */

// Tạo hoặc cập nhật bệnh án (Bác sĩ)
export const createOrUpdateMedicalRecord = async (recordData) => {
  const response = await api.post('/medical-records', recordData);
  return response.data;
};

export const getMedicalRecordByAppointment = async (appointmentId) => {
  const response = await api.get(`/medical-records/appointment/${appointmentId}`);
  return response.data;
};

// Lấy tất cả bệnh án của 1 bệnh nhân
export const getMedicalRecordsByPatient = async (patientId) => {
  const response = await api.get(`/medical-records/patient/${patientId}`);
  return response.data;
};
