import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { capturePayPalPayment } from '../../services/paymentService';
import './PaymentSuccess.css';

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('processing'); // processing, success, error
  const [message, setMessage] = useState('Đang xử lý thanh toán...');

  useEffect(() => {
    const token = searchParams.get('token'); // PayPal order ID
    const payerId = searchParams.get('PayerID');

    if (!token) {
      setStatus('error');
      setMessage('Không tìm thấy thông tin thanh toán');
      return;
    }

    const capturePayment = async () => {
      try {
        console.log('Capturing PayPal payment:', { token, payerId });
        const result = await capturePayPalPayment(token);
        
        console.log('Payment captured:', result);
        setStatus('success');
        setMessage('Thanh toán thành công!');

        // Redirect to booking success after 2 seconds
        setTimeout(() => {
          navigate('/booking-success', {
            state: {
              booking: {
                id: result.appointmentId,
                status: 'CONFIRMED',
                isPaid: true,
                paymentId: result.paymentId
              },
              paymentMethod: 'PayPal',
              paidAmount: result.amount
            }
          });
        }, 2000);
      } catch (err) {
        console.error('Payment capture error:', err);
        setStatus('error');
        setMessage(err.message || 'Thanh toán thất bại. Vui lòng thử lại!');
      }
    };

    capturePayment();
  }, [searchParams, navigate]);

  return (
    <div className="payment-success-page">
      <div className="payment-success-container">
        {status === 'processing' && (
          <>
            <div className="spinner"></div>
            <h1>{message}</h1>
            <p>Vui lòng đợi trong giây lát...</p>
          </>
        )}

        {status === 'success' && (
          <>
            <div className="success-icon">✅</div>
            <h1>{message}</h1>
            <p>Đang chuyển hướng...</p>
          </>
        )}

        {status === 'error' && (
          <>
            <div className="error-icon">❌</div>
            <h1>Thanh toán thất bại</h1>
            <p>{message}</p>
            <div className="action-buttons">
              <button onClick={() => navigate('/booking')} className="btn-secondary">
                Quay lại đặt lịch
              </button>
              <button onClick={() => navigate('/')} className="btn-primary">
                Về trang chủ
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PaymentSuccess;
