import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PayPalModal.css';

const PayPalModal = ({ isOpen, onClose, bookingInfo, paypalUrl }) => {
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const { consultationFee, doctorName, appointmentDate, appointmentTime, booking } = bookingInfo || {};

  if (!isOpen) return null;

  const handleOpenPayPal = () => {
    if (paypalUrl) {
      window.open(paypalUrl, '_blank');
    }
  };

  const handleConfirmPayment = async () => {
    setIsProcessing(true);

    // Navigate to success page - Chat/Video là tính năng sẽ phát triển sau
    setTimeout(() => {
      navigate('/booking-success', {
        state: {
          booking: { ...booking, status: 'CONFIRMED', isPaid: true },
          doctorName,
          appointmentDate,
          appointmentTime,
          paymentMethod: 'PayPal',
          paidAmount: consultationFee
        }
      });
      setIsProcessing(false);
    }, 800);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>&times;</button>
        
        <h2>Thanh toán PayPal</h2>
        
        <div className="paypal-info">
          <div className="paypal-logo">
            <svg viewBox="0 0 24 24" width="80" height="80">
              <path fill="#003087" d="M8.3 20.6c-.2.1-.4.1-.5 0-.1-.1-.1-.3 0-.5l1.8-8.4c.1-.4.4-.7.8-.7h4.2c2.3 0 3.9 1.6 3.9 3.8 0 2.9-2.3 5.3-5.2 5.3H9.1c-.3 0-.6.3-.8.5z"/>
              <path fill="#0070E0" d="M19.8 7.5c0 2.9-2.3 5.3-5.2 5.3h-4.2c-.3 0-.6.3-.8.7l-1.8 8.4c-.1.2-.1.4 0 .5.1.1.3.1.5 0l4.2-.1c2.9 0 5.2-2.4 5.2-5.3 0-2.2-1.6-3.8-3.9-3.8h4.2c2.9 0 5.2-2.4 5.2-5.3 0-2.9-2.3-5.3-5.2-5.3H9.9c-.4 0-.7.3-.8.7L7.3 11.3c-.1.4.1.8.5.9h4.8c2.3 0 3.9 1.6 3.9 3.8z"/>
              <path fill="#003087" d="M7.8 11.3c.1-.4.4-.7.8-.7h4.2c2.3 0 3.9 1.6 3.9 3.8 0 2.9-2.3 5.3-5.2 5.3H7.3l1.8-8.4z"/>
            </svg>
          </div>
          
          <div className="payment-details">
            <div className="info-row">
              <span className="label">Bác sĩ:</span>
              <strong>{doctorName}</strong>
            </div>
            
            <div className="info-row">
              <span className="label">Ngày khám:</span>
              <strong>{appointmentDate} {appointmentTime}</strong>
            </div>
            
            <div className="info-divider"></div>
            
            <div className="info-row amount">
              <span className="label">Số tiền:</span>
              <strong className="highlight">
                {consultationFee?.toLocaleString('vi-VN')}đ
                <span className="usd"> (~${(consultationFee / 25000).toFixed(2)} USD)</span>
              </strong>
            </div>
          </div>
        </div>

        <div className="modal-instructions">
          <h3>Hướng dẫn thanh toán</h3>
          <ol>
            <li>Nhấn nút "Mở PayPal" để thanh toán</li>
            <li>Đăng nhập tài khoản PayPal của bạn</li>
            <li>Xác nhận thanh toán</li>
            <li>Quay lại và nhấn "Tôi đã thanh toán"</li>
          </ol>
        </div>

        <div className="modal-note">
          ⚠️ Sau khi thanh toán, hệ thống sẽ tự động tạo phòng chat và video call
        </div>

        <div className="modal-actions">
          <button 
            className="btn-open-paypal" 
            onClick={handleOpenPayPal}
            disabled={!paypalUrl}
          >
            Mở PayPal
          </button>
          <button 
            className="btn-confirm" 
            onClick={handleConfirmPayment}
            disabled={isProcessing}
          >
            {isProcessing ? 'Đang xử lý...' : 'Tôi đã thanh toán'}
          </button>
        </div>

        <button className="btn-cancel" onClick={onClose} disabled={isProcessing}>
          Hủy
        </button>
      </div>
    </div>
  );
};

export default PayPalModal;
