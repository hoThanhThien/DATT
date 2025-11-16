import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8080/api/v1/payments';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Create PayPal order for online appointment payment
 * @param {Object} paymentData - Payment details
 * @param {number} paymentData.appointmentId - ID of the appointment
 * @param {number} paymentData.patientId - ID of the patient
 * @param {number} paymentData.doctorId - ID of the doctor
 * @param {number} paymentData.total - Total amount in USD
 * @param {string} paymentData.appointmentTime - ISO datetime string
 * @param {string} paymentData.appointmentType - "ONLINE" or "OFFLINE"
 * @returns {Promise} Response with approval URL
 */
export const createPayPalOrder = async (paymentData) => {
  try {
    const response = await api.post('/create-order', paymentData);
    console.log('PayPal API Response:', response.data);
    
    // Backend trả về String URL trực tiếp, không phải object
    if (typeof response.data === 'string') {
      return { approvalUrl: response.data };
    }
    
    return response.data;
  } catch (error) {
    console.error('PayPal API Error:', error.response?.data);
    throw {
      status: error.response?.status || 500,
      message: error.response?.data?.message || error.response?.data || 'Không thể tạo đơn thanh toán PayPal'
    };
  }
};

/**
 * Capture PayPal payment after user approval
 * @param {string} orderId - PayPal order ID
 * @returns {Promise} Payment capture result
 */
export const capturePayPalPayment = async (orderId) => {
  try {
    const response = await api.post(`/capture-order/${orderId}`);
    return response.data;
  } catch (error) {
    throw {
      status: error.response?.status || 500,
      message: error.response?.data?.message || 'Không thể xác nhận thanh toán PayPal'
    };
  }
};

/**
 * Get payment details by payment ID
 * @param {number} paymentId - Payment ID
 * @returns {Promise} Payment details
 */
export const getPaymentById = async (paymentId) => {
  try {
    const response = await api.get(`/${paymentId}`);
    return response.data;
  } catch (error) {
    throw {
      status: error.response?.status || 500,
      message: error.response?.data?.message || 'Không thể tải thông tin thanh toán'
    };
  }
};

/**
 * Get all payments for a patient
 * @param {number} patientId - Patient ID
 * @returns {Promise} List of payments
 */
export const getPaymentsByPatient = async (patientId) => {
  try {
    const response = await api.get(`/patient/${patientId}`);
    return response.data;
  } catch (error) {
    throw {
      status: error.response?.status || 500,
      message: error.response?.data?.message || 'Không thể tải lịch sử thanh toán'
    };
  }
};

/**
 * Convert VND to USD (using rate from backend)
 * Rate: 25000 VND = 1 USD
 * @param {number} amountVND - Amount in VND
 * @returns {number} Amount in USD (rounded to 2 decimals)
 */
export const convertVNDtoUSD = (amountVND) => {
  const RATE = 25000;
  return parseFloat((amountVND / RATE).toFixed(2));
};

export default {
  createPayPalOrder,
  capturePayPalPayment,
  getPaymentById,
  getPaymentsByPatient,
  convertVNDtoUSD
};
