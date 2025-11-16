import { useState, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { createPayPalOrder } from '../../services/paymentService';
import PayPalModal from '../../components/payment/PayPalModal';
import './PaymentPage.css';

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { booking, doctorName, consultationFee, appointmentDate, appointmentTime } = location.state || {};

  const [paymentMethod, setPaymentMethod] = useState('bank_transfer');
  const [processing, setProcessing] = useState(false);
  const [showPayPalModal, setShowPayPalModal] = useState(false);
  const [paypalApprovalUrl, setPaypalApprovalUrl] = useState(null);

  // Redirect if no booking data
  if (!booking) {
    return (
      <div className="payment-page">
        <div className="payment-container">
          <div className="error-box">
            <h2>⚠️ Không tìm thấy thông tin đặt khám</h2>
            <button onClick={() => navigate('/booking')} className="btn-primary">
              Quay lại đặt lịch
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handlePayment = async () => {
    setProcessing(true);

    try {
      if (paymentMethod === 'paypal') {
        // PayPal payment flow - Mở modal thay vì redirect
        
        // Validate required data
        if (!booking?.id || !booking?.doctorId || !user?.id || !appointmentDate || !appointmentTime || !consultationFee) {
          throw new Error('Thiếu thông tin thanh toán. Vui lòng thử lại từ trang đặt lịch.');
        }
        
        // Combine date and time into ISO string
        const appointmentDateTime = new Date(`${appointmentDate}T${appointmentTime}:00`).toISOString();
        
        const paymentData = {
          appointmentId: booking.id,
          patientId: user.id,
          doctorId: booking.doctorId,
          total: consultationFee, // Gửi VND, backend tự convert
          appointmentTime: appointmentDateTime,
          appointmentType: 'ONLINE'
        };

        console.log('Creating PayPal order:', paymentData);
        const result = await createPayPalOrder(paymentData);
        console.log('PayPal order result:', result);
        
        // Get approval URL - check multiple possible field names
        const approvalUrl = result.approvalUrl || result.approval_url || result.url || result.redirectUrl;
        
        if (approvalUrl) {
          console.log('Opening PayPal modal with URL:', approvalUrl);
          setPaypalApprovalUrl(approvalUrl);
          setShowPayPalModal(true);
          setProcessing(false);
        } else {
          console.error('No approval URL found in response:', result);
          throw new Error('Không nhận được link thanh toán PayPal');
        }
      } else {
        // Other payment methods (bank transfer, momo) - simulate
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Navigate to success page
        navigate('/booking-success', {
          state: {
            booking: { ...booking, status: 'CONFIRMED', isPaid: true },
            doctorName,
            appointmentDate,
            appointmentTime,
            paymentMethod,
            paidAmount: consultationFee
          }
        });
      }
    } catch (err) {
      console.error('Payment error:', err);
      console.error('Error details:', {
        status: err.status,
        message: err.message,
        response: err.response
      });
      
      let errorMessage = 'Thanh toán thất bại. Vui lòng thử lại!';
      if (err.message && err.message.includes('Thiếu thông tin')) {
        errorMessage = err.message;
      } else if (err.message) {
        errorMessage = err.message;
      }
      
      alert(errorMessage);
      setProcessing(false);
    }
  };

  return (
    <div className="payment-page">
      <div className="payment-container">
        <h1>Thanh Toán</h1>
        
        <div className="booking-summary">
          <h2>Thông tin đặt khám</h2>
          <div className="summary-item">
            <span>Bác sĩ:</span>
            <strong>{doctorName}</strong>
          </div>
          <div className="summary-item">
            <span>Ngày khám:</span>
            <strong>{appointmentDate}</strong>
          </div>
          <div className="summary-item">
            <span>Giờ khám:</span>
            <strong>{appointmentTime}</strong>
          </div>
          <div className="summary-item">
            <span>Loại khám:</span>
            <strong>Khám Online (Video call)</strong>
          </div>
          <div className="summary-divider"></div>
          <div className="summary-item total">
            <span>Tổng tiền:</span>
            <strong className="amount">
              {consultationFee?.toLocaleString('vi-VN') || '0'}đ
              {paymentMethod === 'paypal' && consultationFee && (
                <span className="usd-amount"> (~${(consultationFee / 25000).toFixed(2)} USD)</span>
              )}
            </strong>
          </div>
        </div>

        <div className="payment-methods">
          <h2>Chọn phương thức thanh toán</h2>
          
          <label className={`payment-option ${paymentMethod === 'bank_transfer' ? 'selected' : ''}`}>
            <input
              type="radio"
              name="payment"
              value="bank_transfer"
              checked={paymentMethod === 'bank_transfer'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <div className="option-content">
              <span className="icon"></span>
              <div>
                <strong>Chuyển khoản ngân hàng</strong>
                <small>Chuyển khoản qua VietQR hoặc số tài khoản</small>
              </div>
            </div>
          </label>

          <label className={`payment-option ${paymentMethod === 'momo' ? 'selected' : ''}`}>
            <input
              type="radio"
              name="payment"
              value="momo"
              checked={paymentMethod === 'momo'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <div className="option-content">
              <span className="icon"></span>
              <div>
                <strong>Ví MoMo</strong>
                <small>Thanh toán qua ví điện tử MoMo</small>
              </div>
            </div>
          </label>

          <label className={`payment-option ${paymentMethod === 'paypal' ? 'selected' : ''}`}>
            <input
              type="radio"
              name="payment"
              value="paypal"
              checked={paymentMethod === 'paypal'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <div className="option-content">
              <span className="icon">💳</span>
              <div>
                <strong>PayPal</strong>
                <small>Thanh toán quốc tế qua PayPal</small>
              </div>
            </div>
          </label>
        </div>

        <div className="payment-actions">
          <button 
            className="btn-back" 
            onClick={() => navigate(-1)}
            disabled={processing}
          >
            Quay lại
          </button>
          <button 
            className="btn-pay" 
            onClick={handlePayment}
            disabled={processing}
          >
            {processing ? 'Đang xử lý...' : `Thanh toán ${consultationFee?.toLocaleString('vi-VN') || '0'}đ`}
          </button>
        </div>

        <div className="payment-note">
          <small>🔒 Thông tin thanh toán được bảo mật an toàn</small>
        </div>
      </div>

      {/* PayPal Modal */}
      <PayPalModal
        isOpen={showPayPalModal}
        onClose={() => {
          setShowPayPalModal(false);
          setProcessing(false);
        }}
        bookingInfo={{
          booking,
          doctorName,
          consultationFee,
          appointmentDate,
          appointmentTime
        }}
        paypalUrl={paypalApprovalUrl}
      />
    </div>
  );
};

export default PaymentPage;
