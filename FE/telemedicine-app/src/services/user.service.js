import api from './api';

/**
 * User Service - Quản lý API liên quan đến User
 */

// Lấy danh sách tất cả users
export const getUsers = async () => {
  const response = await api.get('/users');
  return response.data;
};

// Lấy thông tin user hiện tại (từ JWT token)
export const getCurrentUser = async () => {
  const response = await api.get('/users/me');
  return response.data;
};

// Lấy thông tin user theo ID
export const getUserById = async (userId) => {
  const response = await api.get(`/users/${userId}`);
  return response.data;
};

// Đồng bộ user thủ công (Admin)
export const syncUser = async (userId) => {
  const response = await api.post(`/users/admin/sync/${userId}`);
  return response.data;
};

// Tạo bác sĩ mới (Admin)
export const createDoctor = async (doctorData) => {
  const response = await api.post('/users/admin/create-doctor', doctorData);
  return response.data;
};

// Test API
export const testUserService = async () => {
  const response = await api.get('/users/hello');
  return response.data;
};
