import { useEffect, useState } from 'react';
import { getAllAppointments, updateAppointmentStatus } from '../services/appointment.service';
import './AppointmentList.css';

/**
 * AppointmentList Component
 * Hiển thị danh sách lịch hẹn với xử lý loading và error
 */
const AppointmentList = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updating, setUpdating] = useState(null);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getAllAppointments();
      setAppointments(data);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Không thể tải danh sách lịch hẹn');
      console.error('Error fetching appointments:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleStatusUpdate = async (appointmentId, newStatus) => {
    try {
      setUpdating(appointmentId);
      await updateAppointmentStatus(appointmentId, newStatus);
      // Refresh data sau khi cập nhật
      await fetchAppointments();
    } catch (err) {
      alert('Không thể cập nhật trạng thái: ' + (err.response?.data?.message || err.message));
    } finally {
      setUpdating(null);
    }
  };

  if (loading) {
    return (
      <div className="appointment-list-container">
        <div className="loading">
          <div className="spinner"></div>
          <p>Đang tải danh sách lịch hẹn...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="appointment-list-container">
        <div className="error">
          <h3>⚠️ Có lỗi xảy ra</h3>
          <p>{error}</p>
          <button onClick={fetchAppointments}>Thử lại</button>
        </div>
      </div>
    );
  }

  if (appointments.length === 0) {
    return (
      <div className="appointment-list-container">
        <div className="empty-state">
          <p>Không có lịch hẹn nào</p>
        </div>
      </div>
    );
  }

  return (
    <div className="appointment-list-container">
      <h2>Danh sách Lịch hẹn ({appointments.length})</h2>
      <div className="appointment-grid">
        {appointments.map((appointment) => (
          <div key={appointment.id} className="appointment-card">
            <div className="appointment-header">
              <h3>Lịch hẹn #{appointment.id}</h3>
              <span className={`status-badge status-${appointment.status?.toLowerCase()}`}>
                {appointment.status}
              </span>
            </div>
            <div className="appointment-details">
              <p><strong>Bệnh nhân ID:</strong> {appointment.patientId}</p>
              <p><strong>Bác sĩ ID:</strong> {appointment.doctorId}</p>
              <p><strong>Ngày hẹn:</strong> {new Date(appointment.appointmentDate).toLocaleString('vi-VN')}</p>
              {appointment.notes && (
                <p><strong>Ghi chú:</strong> {appointment.notes}</p>
              )}
            </div>
            <div className="appointment-actions">
              <select
                value={appointment.status}
                onChange={(e) => handleStatusUpdate(appointment.id, e.target.value)}
                disabled={updating === appointment.id}
              >
                <option value="SCHEDULED">SCHEDULED</option>
                <option value="CONFIRMED">CONFIRMED</option>
                <option value="COMPLETED">COMPLETED</option>
                <option value="CANCELLED">CANCELLED</option>
              </select>
              {updating === appointment.id && <span className="updating">Đang cập nhật...</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AppointmentList;
