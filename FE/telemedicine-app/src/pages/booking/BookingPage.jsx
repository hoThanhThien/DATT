import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllDoctors, createBooking } from '../../services/bookingService';
import { AuthContext } from '../../context/AuthContext';
import './BookingPage.css';

const BookingPage = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  console.log('BookingPage mounted, user:', user);

  // State cho các dropdown
  const [doctors, setDoctors] = useState([]);

  // State cho selection
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');
  const [appointmentType, setAppointmentType] = useState('ONLINE');

  // State cho form
  const [reason, setReason] = useState('');

  // Loading & error states
  const [loadingDoctors, setLoadingDoctors] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [error, setError] = useState(null);

  // Load doctors on mount
  useEffect(() => {
    const loadDoctors = async () => {
      try {
        setLoadingDoctors(true);
        setError(null);
        console.log('Loading doctors...');
        const data = await getAllDoctors();
        console.log('Doctors loaded:', data);
        setDoctors(data);
      } catch (err) {
        console.error('Error loading doctors:', err);
        setError(err.message);
      } finally {
        setLoadingDoctors(false);
      }
    };
    loadDoctors();
  }, []);

  // Clear date/time when doctor changes
  useEffect(() => {
    if (!selectedDoctor) {
      setAppointmentDate('');
      setAppointmentTime('');
    }
  }, [selectedDoctor]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Kiểm tra user đã đăng nhập chưa
    if (!user || !user.id) {
      setError('Vui lòng đăng nhập để đặt lịch khám');
      return;
    }

    if (!selectedDoctor) {
      setError('Vui lòng chọn bác sĩ');
      return;
    }

    if (!appointmentDate || !appointmentTime) {
      setError('Vui lòng chọn ngày và giờ khám');
      return;
    }

    try {
      setSubmitting(true);

      // Kết hợp ngày và giờ thành ISO string
      const appointmentDateTime = new Date(`${appointmentDate}T${appointmentTime}:00`).toISOString();
      
      // Tạo payload theo format backend API
      const payload = {
        patientId: user.id,
        doctorId: parseInt(selectedDoctor),
        appointmentTime: appointmentDateTime,
        type: appointmentType,
        reason: reason.trim() || 'Khám bệnh'
      };

      console.log('Creating appointment with payload:', payload);
      const result = await createBooking(payload);
      
      const selectedDoctorData = doctors.find(d => d.id === parseInt(selectedDoctor));
      
      // Navigate based on appointment type
      if (appointmentType === 'ONLINE') {
        // ONLINE: Chuyển sang trang thanh toán
        navigate('/payment', { 
          state: { 
            booking: result,
            doctorName: selectedDoctorData?.fullName || selectedDoctorData?.name,
            consultationFee: selectedDoctorData?.consultationFee,
            appointmentDate,
            appointmentTime
          } 
        });
      } else {
        // OFFLINE: Hiển thị success với queue number
        navigate('/booking-success', { 
          state: { 
            booking: result,
            doctorName: selectedDoctorData?.fullName || selectedDoctorData?.name,
            appointmentDate,
            appointmentTime,
            queueNumber: result.queueNumber
          } 
        });
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="booking-page">
      <div className="booking-container">
        <h1>Đặt Vé Khám Bệnh</h1>

        {error && (
          <div className="error-message" role="alert">
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="booking-form">
          {/* Chọn bác sĩ */}
          <div className="form-group">
            <label htmlFor="doctor">Chọn bác sĩ *</label>
            {loadingDoctors ? (
              <div className="loading-text">Đang tải danh sách bác sĩ...</div>
            ) : (
              <select
                id="doctor"
                value={selectedDoctor}
                onChange={(e) => setSelectedDoctor(e.target.value)}
                required
                disabled={submitting}
              >
                <option value="">-- Chọn bác sĩ --</option>
                {Array.isArray(doctors) && doctors.map(doctor => (
                  <option key={doctor.id} value={doctor.id}>
                    {doctor.fullName || doctor.name || 'Bác sĩ'} - {doctor.specialization || 'Bác sĩ đa khoa'}
                    {doctor.consultationFee && ` - ${doctor.consultationFee.toLocaleString('vi-VN')}đ`}
                  </option>
                ))}
              </select>
            )}
            {selectedDoctor && doctors.find(d => d.id === parseInt(selectedDoctor))?.consultationFee && (
              <div className="fee-info">
                Phí khám: <strong>{doctors.find(d => d.id === parseInt(selectedDoctor)).consultationFee.toLocaleString('vi-VN')}đ</strong>
              </div>
            )}
          </div>

          {/* Chọn ngày khám */}
          <div className="form-group">
            <label htmlFor="appointmentDate">Ngày khám *</label>
            <input
              type="date"
              id="appointmentDate"
              value={appointmentDate}
              onChange={(e) => setAppointmentDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              required
              disabled={!selectedDoctor || submitting}
            />
          </div>

          {/* Chọn giờ khám */}
          <div className="form-group">
            <label htmlFor="appointmentTime">Giờ khám *</label>
            <input
              type="time"
              id="appointmentTime"
              value={appointmentTime}
              onChange={(e) => setAppointmentTime(e.target.value)}
              required
              disabled={!selectedDoctor || submitting}
            />
          </div>

          <div className="form-divider"></div>

          {/* Loại khám */}
          <div className="form-group">
            <label htmlFor="appointmentType">Loại khám *</label>
            <select
              id="appointmentType"
              value={appointmentType}
              onChange={(e) => setAppointmentType(e.target.value)}
              required
              disabled={submitting}
            >
              <option value="ONLINE">Khám Online (Video call)</option>
              <option value="OFFLINE">Khám Trực tiếp</option>
            </select>
          </div>

          {/* Lý do khám */}
          <div className="form-group">
            <label htmlFor="reason">Lý do khám / Triệu chứng *</label>
            <textarea
              id="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Ví dụ: Tư vấn triệu chứng ho, đau đầu, sốt..."
              rows="3"
              required
              disabled={submitting}
            />
            <small>Mô tả triệu chứng hoặc lý do bạn cần gặp bác sĩ</small>
          </div>

          {/* Thông tin người dùng */}
          {!user && (
            <div className="login-notice">
              ⚠️ Bạn cần <a href="/login">đăng nhập</a> để đặt lịch khám
            </div>
          )}
          {user && (
            <div className="user-info">
              <p>Đặt lịch cho: <strong>{user.fullName || user.username}</strong></p>
            </div>
          )}

          {/* Submit button */}
          <button
            type="submit"
            className="btn-submit"
            disabled={submitting || !selectedDoctor || !appointmentDate || !appointmentTime || !user}
          >
            {submitting ? 'Đang xử lý...' : (appointmentType === 'ONLINE' ? 'Tiếp tục thanh toán' : 'Đặt lịch khám')}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookingPage;
