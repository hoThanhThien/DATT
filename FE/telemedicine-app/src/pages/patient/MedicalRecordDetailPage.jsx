import { useParams, useNavigate } from 'react-router-dom';
import './MedicalRecordDetailPage.css';
import Footer from '../../components/layout/Footer';

const MedicalRecordDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock data - sẽ thay thế bằng API call thực tế
  const recordsData = {
    1: {
      id: 1,
      type: 'online',
      doctorName: 'BS. CAO QUỐC HÙNG',
      specialty: 'Nội khoa',
      time: '9h',
      date: '20/11/2025',
      status: 'Sắp tới',
      statusColor: '#0009ff',
      symptoms: 'Chưa có thông tin',
      diagnosis: 'Chưa khám',
      prescription: [],
      notes: 'Lịch hẹn sắp tới',
    },
    2: {
      id: 2,
      type: 'offline',
      doctorName: 'BS. NGUYỄN VIẾT THÀNH',
      specialty: 'Tim mạch',
      time: '9h',
      date: '11/11/2025',
      status: 'Đã khám',
      statusColor: '#08ff00',
      symptoms: 'Đau ngực, khó thở khi gắng sức',
      diagnosis: 'Tăng huyết áp độ 1',
      prescription: [
        { name: 'Amlodipine 5mg', dosage: '1 viên/ngày, uống sau bữa sáng', duration: '30 ngày' },
        { name: 'Aspirin 100mg', dosage: '1 viên/ngày, uống sau bữa tối', duration: '30 ngày' },
      ],
      notes: 'Theo dõi huyết áp hàng ngày. Tái khám sau 1 tháng. Hạn chế muối, tăng cường vận động.',
      bloodPressure: '150/95 mmHg',
      heartRate: '82 bpm',
      weight: '72 kg',
      height: '170 cm',
    },
    3: {
      id: 3,
      type: 'online',
      doctorName: 'BS. NGUYỄN THỊ DIỄM LỆ',
      specialty: 'Da liễu',
      time: '9h',
      date: '11/11/2025',
      status: 'Đã hủy',
      statusColor: '#ff0004',
      symptoms: 'Không có thông tin',
      diagnosis: 'Không khám',
      prescription: [],
      notes: 'Lịch hẹn đã bị hủy bởi bệnh nhân',
    },
    4: {
      id: 4,
      type: 'online',
      doctorName: 'BS. CAO QUỐC HÙNG',
      specialty: 'Nội khoa',
      time: '9h',
      date: '11/11/2025',
      status: 'Đã khám',
      statusColor: '#08ff00',
      symptoms: 'Đau đầu, chóng mặt, mệt mỏi',
      diagnosis: 'Thiếu máu nhẹ, stress',
      prescription: [
        { name: 'Ferro-Folic', dosage: '1 viên/ngày, uống sau bữa ăn', duration: '60 ngày' },
        { name: 'Vitamin B Complex', dosage: '1 viên/ngày', duration: '30 ngày' },
      ],
      notes: 'Bổ sung dinh dưỡng, nghỉ ngơi đầy đủ. Tái khám sau 2 tháng nếu triệu chứng không cải thiện.',
      bloodPressure: '110/70 mmHg',
      heartRate: '75 bpm',
    },
  };

  const record = recordsData[id];

  if (!record) {
    return (
      <div className="medical-record-detail-page">
        <div className="detail-container">
          <h1>Không tìm thấy hồ sơ</h1>
          <button className="btn-back" onClick={() => navigate('/medical-records')}>
            Quay lại
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="medical-record-detail-page">
      <section className="detail-section">
        <div className="detail-header">
          <button className="btn-back" onClick={() => navigate('/medical-records')}>
            ← Quay lại
          </button>
          <h1 className="detail-title">CHI TIẾT HỒ SƠ KHÁM BỆNH</h1>
        </div>

        <div className="detail-container">
          {/* Thông tin buổi khám */}
          <div className="detail-card">
            <h2 className="card-title">Thông tin buổi khám</h2>
            <div className="detail-grid">
              <div className="detail-item">
                <span className="item-label">Loại khám:</span>
                <span className="item-value">
                  {record.type === 'online' ? 'Khám Online' : 'Khám tại phòng khám'}
                </span>
              </div>
              <div className="detail-item">
                <span className="item-label">Bác sĩ:</span>
                <span className="item-value">{record.doctorName}</span>
              </div>
              <div className="detail-item">
                <span className="item-label">Chuyên khoa:</span>
                <span className="item-value">{record.specialty}</span>
              </div>
              <div className="detail-item">
                <span className="item-label">Thời gian:</span>
                <span className="item-value">{record.time}</span>
              </div>
              <div className="detail-item">
                <span className="item-label">Ngày:</span>
                <span className="item-value">{record.date}</span>
              </div>
              <div className="detail-item">
                <span className="item-label">Trạng thái:</span>
                <span className="item-value" style={{ color: record.statusColor, fontWeight: 'bold' }}>
                  {record.status}
                </span>
              </div>
            </div>
          </div>

          {/* Chỉ số sinh tồn (nếu có) */}
          {(record.bloodPressure || record.heartRate || record.weight || record.height) && (
            <div className="detail-card">
              <h2 className="card-title">Chỉ số sinh tồn</h2>
              <div className="detail-grid">
                {record.bloodPressure && (
                  <div className="detail-item">
                    <span className="item-label">Huyết áp:</span>
                    <span className="item-value">{record.bloodPressure}</span>
                  </div>
                )}
                {record.heartRate && (
                  <div className="detail-item">
                    <span className="item-label">Nhịp tim:</span>
                    <span className="item-value">{record.heartRate}</span>
                  </div>
                )}
                {record.weight && (
                  <div className="detail-item">
                    <span className="item-label">Cân nặng:</span>
                    <span className="item-value">{record.weight}</span>
                  </div>
                )}
                {record.height && (
                  <div className="detail-item">
                    <span className="item-label">Chiều cao:</span>
                    <span className="item-value">{record.height}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Triệu chứng */}
          <div className="detail-card">
            <h2 className="card-title">Triệu chứng</h2>
            <p className="detail-text">{record.symptoms}</p>
          </div>

          {/* Chẩn đoán */}
          <div className="detail-card">
            <h2 className="card-title">Chẩn đoán</h2>
            <p className="detail-text">{record.diagnosis}</p>
          </div>

          {/* Đơn thuốc */}
          <div className="detail-card">
            <h2 className="card-title">Đơn thuốc</h2>
            {record.prescription.length > 0 ? (
              <div className="prescription-list">
                {record.prescription.map((medicine, index) => (
                  <div key={index} className="prescription-item">
                    <div className="medicine-header">
                      <span className="medicine-number">{index + 1}.</span>
                      <span className="medicine-name">{medicine.name}</span>
                    </div>
                    <div className="medicine-details">
                      <p>
                        <strong>Liều dùng:</strong> {medicine.dosage}
                      </p>
                      <p>
                        <strong>Thời gian:</strong> {medicine.duration}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="detail-text">Không có đơn thuốc</p>
            )}
          </div>

          {/* Ghi chú của bác sĩ */}
          <div className="detail-card">
            <h2 className="card-title">Ghi chú của bác sĩ</h2>
            <p className="detail-text">{record.notes}</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default MedicalRecordDetailPage;
