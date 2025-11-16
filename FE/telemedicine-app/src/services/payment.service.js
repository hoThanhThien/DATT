import api from './api';

/**
 * Payment Service - Quản lý API liên quan đến Thanh toán
 */

// Tạo đơn thanh toán PayPal và nhận approval link
export const createPaymentOrder = async (paymentData) => {
  // paymentData: { amount, currency, appointmentId, description }
  const response = await api.post('/payments/create-order', paymentData);
  return response.data; // Trả về approval link string
};

// Capture payment sau khi user approve trên PayPal
// (Thường được gọi từ callback URL, không cần gọi trực tiếp từ React)
export const capturePaymentOrder = async (paymentId, payerId, appointmentId) => {
  const response = await api.get('/payments/capture-order', {
    params: {
      paymentId,
      PayerID: payerId,
      appointmentId
    }
  });
  return response.data;
};
