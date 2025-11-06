import api from './api';

/**
 * Đăng nhập với username (email hoặc số điện thoại) và password
 * @param {string} username - Email hoặc số điện thoại
 * @param {string} password - Mật khẩu
 * @returns {Promise} - Kết quả từ API
 */
export const login = (username, password) => {
  return api.post('/auth/login', {
    username,
    password
  });
};

/**
 * Đăng ký tài khoản mới
 * @param {Object} userData - Dữ liệu đăng ký
 * @param {string} userData.email - Email
 * @param {string} userData.password - Mật khẩu
 * @param {string} userData.fullName - Họ và tên
 * @returns {Promise} - Kết quả từ API
 */
export const register = (userData) => {
  return api.post('/users/register', {
    email: userData.email,
    password: userData.password,
    fullName: userData.fullName
  });
};
