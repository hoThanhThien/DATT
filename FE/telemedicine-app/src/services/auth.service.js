import api from './api';

/**
 * Đăng nhập với email và password
 * Lưu token (JWT) vào localStorage nếu thành công
 * @param {string} email - Email của người dùng
 * @param {string} password - Mật khẩu
 * @returns {Promise} - Kết quả từ API (response.data chứa token, role)
 */
export const login = async (email, password) => {
  const response = await api.post('/auth/login', {
    email,
    password,
  });

  // Backend trả về { token, role }
  if (response?.data?.token) {
    localStorage.setItem('token', response.data.token);
    if (response.data.role) localStorage.setItem('role', response.data.role);
  }

  return response;
};


/**
 * Đăng ký tài khoản mới
 * Gửi toàn bộ userData (backend chấp nhận nhiều trường như phoneNumber, dob...)
 * @param {Object} userData - Dữ liệu đăng ký
 * @returns {Promise}
 */
export const register = (userData) => {
  // send the data as-is; backend RegisterRequest expects fields like email, phoneNumber, password, fullName, gender, dob, insuranceNumber
  return api.post('/users/register', userData);
};


/**
 * Đăng xuất: xoá token và role khỏi localStorage
 */
export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('role');
  // Optional: redirect to login page (adjust route as your app uses)
  // window.location.href = '/login';
};
