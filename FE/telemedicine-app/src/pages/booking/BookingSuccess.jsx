import { useLocation, useNavigate, Link } from 'react-router-dom';
import './BookingSuccess.css';

const BookingSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { 
    booking, 
    clinicName, 
    doctorName, 
    appointmentDate, 
    appointmentTime, 
    queueNumber,
    paymentMethod,
    paidAmount,
    chatRoom,
    videoSession,
    hasChatRoom,
    hasVideoCall,
    setupError,
    setupPending,
    setupMessage
  } = location.state || {};

  // Redirect if no booking data
  if (!booking) {
    return (
      <div className="booking-success-page">
        <div className="success-container">
          <div className="error-box">
            <h2>Không tìm thấy thông tin booking</h2>
            <button onClick={() => navigate('/')} className="btn-primary">
              Về trang đặt vé
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="booking-success-page">
      <div className="success-container">
        <div className="success-icon">✅</div>
        <h1>Đặt Vé Thành Công!</h1>
        <p className="success-message">
          Booking của bạn đã được tạo thành công. Vui lòng đến đúng giờ hẹn.
        </p>

        <div className="booking-info">
          <h2>Thông tin đặt vé</h2>
          
          <div className="info-row">
            <span className="label">Mã booking:</span>
            <span className="value">{booking.id || booking.bookingId}</span>
          </div>

          <div className="info-row">
            <span className="label">Phòng khám:</span>
            <span className="value">{clinicName || booking.clinicName || 'N/A'}</span>
          </div>

          <div className="info-row">
            <span className="label">Bác sĩ:</span>
            <span className="value">{doctorName || booking.doctorName || 'N/A'}</span>
          </div>

          <div className="info-row">
            <span className="label">Thời gian:</span>
            <span className="value highlight">
              {appointmentDate && appointmentTime 
                ? `${appointmentDate} ${appointmentTime}` 
                : booking.appointmentTime || 'N/A'}
            </span>
          </div>

          {(queueNumber || booking.queueNumber) && (
            <div className="info-row queue-highlight">
              <span className="label">Số thứ tự:</span>
              <span className="value queue-number">{queueNumber || booking.queueNumber}</span>
            </div>
          )}

          <div className="info-row">
            <span className="label">Bệnh nhân:</span>
            <span className="value">{booking.patientName}</span>
          </div>

          <div className="info-row">
            <span className="label">Số điện thoại:</span>
            <span className="value">{booking.patientPhone}</span>
          </div>

          {booking.note && (
            <div className="info-row">
              <span className="label">Ghi chú:</span>
              <span className="value">{booking.note}</span>
            </div>
          )}

          <div className="info-row">
            <span className="label">Trạng thái:</span>
            <span className="value status-confirmed">
              {booking.status || 'CONFIRMED'}
            </span>
          </div>

          {paymentMethod && (
            <div className="info-row">
              <span className="label">Phương thức thanh toán:</span>
              <span className="value">{paymentMethod}</span>
            </div>
          )}

          {paidAmount && (
            <div className="info-row">
              <span className="label">Số tiền đã thanh toán:</span>
              <span className="value amount-paid">{paidAmount.toLocaleString('vi-VN')}đ</span>
            </div>
          )}
        </div>

        {/* Chat and Video Call Info */}
        {setupPending && (
          <div className="service-info pending">
            <h2>Dịch vụ trực tuyến</h2>
            
            <div className="pending-box">
              <div className="pending-icon">⏳</div>
              <div className="pending-content">
                <h3>Đang thiết lập dịch vụ</h3>
                <p>{setupMessage || 'Phòng chat và video call đang được chuẩn bị...'}</p>
                <small>Vui lòng kiểm tra lại sau vài phút hoặc làm mới trang.</small>
              </div>
            </div>
          </div>
        )}

        {(hasChatRoom || hasVideoCall) && !setupPending && (
          <div className="service-info">
            <h2>Dịch vụ trực tuyến</h2>
            
            {setupError && (
              <div className="warning-box">
                ⚠️ Có lỗi khi thiết lập dịch vụ: {setupError}
                <br />
                <small>Vui lòng liên hệ hỗ trợ để kích hoạt lại.</small>
              </div>
            )}

            {hasChatRoom && chatRoom && (
              <div className="service-item">
                <div className="service-icon">💬</div>
                <div className="service-content">
                  <h3>Phòng chat</h3>
                  <p>Phòng chat đã được tạo. Bạn có thể nhắn tin với bác sĩ.</p>
                  <button 
                    className="btn-service"
                    onClick={() => navigate(`/chat/${chatRoom.id}`)}
                  >
                    Mở phòng chat
                  </button>
                </div>
              </div>
            )}

            {hasVideoCall && videoSession && (
              <div className="service-item">
                <div className="service-icon">📹</div>
                <div className="service-content">
                  <h3>Phòng video call</h3>
                  <p>Phòng video call đã sẵn sàng cho cuộc khám.</p>
                  <button 
                    className="btn-service"
                    onClick={() => navigate(`/video/${videoSession.id}`)}
                  >
                    Tham gia video call
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        <div className="action-buttons">
          <Link 
            to={`/booking/${booking.id || booking.bookingId}`}
            className="btn-secondary"
          >
            Xem chi tiết booking
          </Link>
          <button 
            onClick={() => navigate('/')}
            className="btn-primary"
          >
            Đặt vé mới
          </button>
        </div>

        <div className="notice-box">
          <p>
            💡 <strong>Lưu ý:</strong> Vui lòng đến trước 15 phút để làm thủ tục khám.
            Mang theo CMND/CCCD và thẻ BHYT (nếu có).
          </p>
        </div>
      </div>
    </div>
  );
};

export default BookingSuccess;
