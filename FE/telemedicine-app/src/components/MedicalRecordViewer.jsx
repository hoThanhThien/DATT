import { useState } from 'react';
import { getMedicalRecordsByPatient } from '../services/medicalRecord.service';
import './MedicalRecordViewer.css';

/**
 * MedicalRecordViewer Component
 * Xem bệnh án của bệnh nhân theo patientId
 */
const MedicalRecordViewer = () => {
  const [patientId, setPatientId] = useState('');
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    
    if (!patientId || patientId.trim() === '') {
      alert('Vui lòng nhập Patient ID');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setSearched(true);
      const data = await getMedicalRecordsByPatient(patientId);
      setRecords(data);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Không thể tải bệnh án');
      console.error('Error fetching medical records:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="medical-record-viewer-container">
      <h2>Xem Bệnh án</h2>
      
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="number"
          placeholder="Nhập Patient ID"
          value={patientId}
          onChange={(e) => setPatientId(e.target.value)}
          className="search-input"
        />
        <button type="submit" className="search-button" disabled={loading}>
          {loading ? 'Đang tìm...' : 'Tìm kiếm'}
        </button>
      </form>

      {loading && (
        <div className="loading">
          <div className="spinner"></div>
          <p>Đang tải bệnh án...</p>
        </div>
      )}

      {error && (
        <div className="error">
          <h3>⚠️ Có lỗi xảy ra</h3>
          <p>{error}</p>
        </div>
      )}

      {!loading && !error && searched && records.length === 0 && (
        <div className="empty-state">
          <p>Không tìm thấy bệnh án nào cho bệnh nhân này</p>
        </div>
      )}

      {!loading && !error && records.length > 0 && (
        <div className="records-list">
          <h3>Danh sách bệnh án ({records.length})</h3>
          {records.map((record) => (
            <div key={record.id} className="record-card">
              <div className="record-header">
                <h4>Bệnh án #{record.id}</h4>
                <span className="appointment-badge">
                  Appointment: {record.appointmentId}
                </span>
              </div>
              <div className="record-details">
                <div className="detail-row">
                  <strong>Chẩn đoán:</strong>
                  <p>{record.diagnosis || 'Chưa có'}</p>
                </div>
                <div className="detail-row">
                  <strong>Đơn thuốc:</strong>
                  <p>{record.prescription || 'Chưa có'}</p>
                </div>
                <div className="detail-row">
                  <strong>Ghi chú:</strong>
                  <p>{record.notes || 'Không có ghi chú'}</p>
                </div>
                <div className="detail-row">
                  <strong>Ngày tạo:</strong>
                  <p>{new Date(record.createdAt).toLocaleString('vi-VN')}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MedicalRecordViewer;
