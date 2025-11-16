import api from './api';

/**
 * Appointment Service - Quản lý API liên quan đến Lịch hẹn
 */

// Tạo lịch hẹn mới
export const createAppointment = async (appointmentData) => {
  const response = await api.post('/appointments/create-appointment', appointmentData);
  return response.data;
};

// Lấy tất cả lịch hẹn
export const getAllAppointments = async () => {
  const response = await api.get('/appointments');
  return response.data;
};

// Lấy chi tiết 1 lịch hẹn
export const getAppointmentById = async (appointmentId) => {
  const response = await api.get(`/appointments/${appointmentId}`);
  return response.data;
};

// Cập nhật trạng thái lịch hẹn
export const updateAppointmentStatus = async (appointmentId, status) => {
  const response = await api.put(`/appointments/${appointmentId}/status`, null, {
    params: { status }
  });
  return response.data;
};

// Xóa lịch hẹn
export const deleteAppointment = async (appointmentId) => {
  const response = await api.delete(`/appointments/${appointmentId}`);
  return response.data;
};
