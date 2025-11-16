import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getBookingDetail, cancelBooking } from '../../services/bookingService';
import './BookingDetail.css';

const BookingDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cancelling, setCancelling] = useState(false);

  // Load booking detail on mount
  useEffect(() => {
    const loadBooking = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getBookingDetail(id);
        setBooking(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadBooking();
    }
  }, [id]);

  // Handle cancel booking
  const handleCancelBooking = async () => {
    const confirmed = window.confirm(
      'Bạn có chắc chắn muốn hủy booking này?\nHành động này không thể hoàn tác.'
    );

    if (!confirmed) return;

    try {
      setCancelling(true);
      setError(null);
      await cancelBooking(id);
      
      // Update booking status in UI
      setBooking(prev => ({
        ...prev,
        status: 'CANCELLED'
      }));

      alert('Đã hủy booking thành công!');
    } catch (err) {
      setError(err.message);
      alert('Không thể hủy booking: ' + err.message);
    } finally {
      setCancelling(false);
    }
  };

  // Render loading state
  if (loading) {
    return (
      <div className="booking-detail-page">
        <div className="detail-container">
          <div className="loading-box">
            <div className="spinner"></div>
            <p>Đang tải thông tin booking...</p>
          </div>
        </div>
      </div>
    );
  }

  // Render error state
  if (error && !booking) {
    return (
      <div className="booking-detail-page">
        <div className="detail-container">
          <div className="error-box">
            <h2>Không thể tải booking</h2>
            <p>{error}</p>
            <button onClick={() => navigate('/')} className="btn-primary">
              Về trang chủ
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Check booking status
  const isCancelled = booking?.status === 'CANCELLED';
  const isCompleted = booking?.status === 'COMPLETED';
  const canCancel = !isCancelled && !isCompleted;

  return (
    <div className="booking-detail-page">
      <div className="detail-container">
        <div className="detail-header">
          <button onClick={() => navigate(-1)} className="btn-back">
            ← Quay lại
          </button>
          <h1>Chi Tiết Booking</h1>
        </div>

        {error && (
          <div className="error-message" role="alert">
            ⚠️ {error}
          </div>
        )}

        <div className="booking-card">
          <div className="card-header">
            <h2>Booking #{booking.id || booking.bookingId}</h2>
            <span className={`status-badge status-${booking.status?.toLowerCase()}`}>
              {booking.status || 'N/A'}
            </span>
          </div>

          <div className="card-body">
            <div className="info-section">
              <h3>📋 Thông tin khám</h3>
              <div className="info-grid">
                <div className="info-item">
                  <span className="label">Phòng khám:</span>
                  <span className="value">{booking.clinicName || 'N/A'}</span>
                </div>
                <div className="info-item">
                  <span className="label">Bác sĩ:</span>
                  <span className="value">{booking.doctorName || 'N/A'}</span>
                </div>
                <div className="info-item">
                  <span className="label">Chuyên khoa:</span>
                  <span className="value">{booking.specialization || 'N/A'}</span>
                </div>
                <div className="info-item">
                  <span className="label">Thời gian:</span>
                  <span className="value highlight">{booking.slotTime || 'N/A'}</span>
                </div>
              </div>
            </div>

            <div className="info-section">
              <h3>👤 Thông tin bệnh nhân</h3>
              <div className="info-grid">
                <div className="info-item">
                  <span className="label">Họ tên:</span>
                  <span className="value">{booking.patientName}</span>
                </div>
                <div className="info-item">
                  <span className="label">Số điện thoại:</span>
                  <span className="value">{booking.patientPhone}</span>
                </div>
                {booking.patientEmail && (
                  <div className="info-item">
                    <span className="label">Email:</span>
                    <span className="value">{booking.patientEmail}</span>
                  </div>
                )}
              </div>
            </div>

            {booking.note && (
              <div className="info-section">
                <h3>📝 Ghi chú</h3>
                <p className="note-text">{booking.note}</p>
              </div>
            )}

            <div className="info-section">
              <h3>📅 Thời gian tạo</h3>
              <p className="created-time">
                {booking.createdAt 
                  ? new Date(booking.createdAt).toLocaleString('vi-VN')
                  : 'N/A'
                }
              </p>
            </div>
          </div>

          {canCancel && (
            <div className="card-footer">
              <button
                onClick={handleCancelBooking}
                className="btn-cancel-booking"
                disabled={cancelling}
              >
                {cancelling ? 'Đang hủy...' : 'Hủy Booking'}
              </button>
            </div>
          )}

          {isCancelled && (
            <div className="cancelled-notice">
              ⚠️ Booking này đã bị hủy
            </div>
          )}

          {isCompleted && (
            <div className="completed-notice">
              ✅ Booking này đã hoàn thành
            </div>
          )}
        </div>

        <div className="action-buttons">
          <button 
            onClick={() => navigate('/')}
            className="btn-primary"
          >
            Đặt vé mới
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingDetail;
