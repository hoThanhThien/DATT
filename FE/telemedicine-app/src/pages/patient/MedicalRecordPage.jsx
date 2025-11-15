import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './MedicalRecordPage.css';
import Footer from '../../components/layout/Footer';

const MedicalRecordPage = () => {
  const navigate = useNavigate();
  const [records] = useState([
    {
      id: 1,
      type: 'online',
      doctorName: 'BS. CAO QUỐC HÙNG',
      time: '9h',
      date: '20/11/2025',
      status: 'Sắp tới',
      statusColor: '#0009ff',
      isCompleted: false,
    },
    {
      id: 2,
      type: 'offline',
      doctorName: 'BS. NGUYỄN VIẾT THÀNH',
      time: '9h',
      date: '11/11/2025',
      status: 'Đã khám',
      statusColor: '#08ff00',
      isCompleted: true,
    },
    {
      id: 3,
      type: 'online',
      doctorName: 'BS. NGUYỄN THỊ DIỄM LỆ',
      time: '9h',
      date: '11/11/2025',
      status: 'Đã hủy',
      statusColor: '#ff0004',
      isCompleted: false,
    },
    {
      id: 4,
      type: 'online',
      doctorName: 'BS. CAO QUỐC HÙNG',
      time: '9h',
      date: '11/11/2025',
      status: 'Đã khám',
      statusColor: '#08ff00',
      isCompleted: true,
    },
  ]);

  const handleDetailClick = (recordId) => {
    navigate(`/medical-records/${recordId}`);
  };

  return (
    <div className="medical-record-page">
      <section className="medical-record-section">
        <h1 className="medical-record-title">HỒ SƠ KHÁM BỆNH</h1>
        
        <div className="medical-records-container">
          {records.map((record) => (
            <div
              key={record.id}
              className={`medical-record-card ${record.isCompleted ? 'completed' : ''}`}
            >
              <div className="record-header">
                <h3 className="record-doctor">
                  {record.type === 'online' ? 'KHÁM ONLINE' : 'KHÁM TẠI PHÒNG KHÁM'} - {record.doctorName}
                </h3>
              </div>

              <div className="record-info">
                <div className="info-row">
                  <p className="info-label">Thời gian: {record.time}</p>
                  <p className="info-label">Ngày: {record.date}</p>
                </div>
              </div>

              <div className="record-footer">
                <div className="record-status">
                  <p className="status-label">
                    Trạng thái: <span className="status-value" style={{ color: record.statusColor }}>
                      {record.status}
                    </span>
                  </p>
                </div>
                <button 
                  className="btn-detail"
                  onClick={() => handleDetailClick(record.id)}
                >
                  Chi tiết
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default MedicalRecordPage;
