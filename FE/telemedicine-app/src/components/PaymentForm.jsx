import { useState } from 'react';
import { createPaymentOrder } from '../services/payment.service';
import './PaymentForm.css';

/**
 * PaymentForm Component
 * Form tạo đơn thanh toán PayPal
 */
const PaymentForm = () => {
  const [formData, setFormData] = useState({
    amount: '',
    currency: 'USD',
    appointmentId: '',
    description: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [approvalUrl, setApprovalUrl] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.amount || !formData.appointmentId) {
      alert('Vui lòng điền đầy đủ thông tin');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setApprovalUrl(null);
      
      const approvalLink = await createPaymentOrder(formData);
      setApprovalUrl(approvalLink);
      
      // Tự động chuyển hướng đến PayPal
      if (approvalLink) {
        window.location.href = approvalLink;
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Không thể tạo đơn thanh toán');
      console.error('Error creating payment:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="payment-form-container">
      <h2>Tạo đơn thanh toán</h2>
      
      <form onSubmit={handleSubmit} className="payment-form">
        <div className="form-group">
          <label htmlFor="appointmentId">Appointment ID *</label>
          <input
            type="number"
            id="appointmentId"
            name="appointmentId"
            value={formData.appointmentId}
            onChange={handleChange}
            placeholder="Nhập Appointment ID"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="amount">Số tiền *</label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="Nhập số tiền"
            step="0.01"
            min="0.01"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="currency">Đơn vị tiền tệ</label>
          <select
            id="currency"
            name="currency"
            value={formData.currency}
            onChange={handleChange}
          >
            <option value="USD">USD</option>
            <option value="VND">VND</option>
            <option value="EUR">EUR</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="description">Mô tả</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Nhập mô tả thanh toán (không bắt buộc)"
            rows="3"
          />
        </div>

        <button 
          type="submit" 
          className="submit-button"
          disabled={loading}
        >
          {loading ? 'Đang xử lý...' : 'Thanh toán với PayPal'}
        </button>
      </form>

      {loading && (
        <div className="loading">
          <div className="spinner"></div>
          <p>Đang tạo đơn thanh toán...</p>
        </div>
      )}

      {error && (
        <div className="error">
          <h3>⚠️ Có lỗi xảy ra</h3>
          <p>{error}</p>
        </div>
      )}

      {approvalUrl && !loading && (
        <div className="success">
          <h3>✅ Tạo đơn thành công!</h3>
          <p>Đang chuyển hướng đến PayPal...</p>
          <a href={approvalUrl} target="_blank" rel="noopener noreferrer">
            Hoặc click vào đây để thanh toán
          </a>
        </div>
      )}
    </div>
  );
};

export default PaymentForm;
