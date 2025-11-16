import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HeroBookingCard.css';

const HeroBookingCard = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Chuyển sang trang booking
    navigate('/booking');
  };

  return (
    <aside className="hero-booking-card">
      <div className="booking-top">
        <h3>Đặt khám nhanh</h3>
        <p className="muted">100+ bệnh viện · 1000+ phòng khám · Đặt trong 1 phút</p>
      </div>

      <form className="booking-form" onSubmit={handleSubmit}>
        <label>
          Bệnh viện / Phòng khám
          <select defaultValue="">
            <option value="">Chọn bệnh viện</option>
            <option value="bv1">Bệnh viện Quốc tế A</option>
            <option value="bv2">Phòng khám Sức khỏe B</option>
            <option value="bv3">Phòng mạch C</option>
          </select>
        </label>

        <label>
          Chuyên khoa
          <select defaultValue="">
            <option value="">Chọn chuyên khoa</option>
            <option value="k1">Nội tổng quát</option>
            <option value="k2">Sản - Phụ khoa</option>
            <option value="k3">Nhi khoa</option>
          </select>
        </label>

        <div className="booking-row">
          <label>
            Ngày
            <input type="date" />
          </label>

          <label>
            Ca
            <select defaultValue="">
              <option value="">Chọn ca</option>
              <option value="morning">Sáng</option>
              <option value="afternoon">Chiều</option>
              <option value="evening">Tối</option>
            </select>
          </label>
        </div>

        <button className="btn primary btn-book" type="submit">Đặt khám ngay</button>
      </form>

      <div className="booking-foot">
        <small>Hỗ trợ thanh toán & bảo hiểm. Hủy / đổi lịch dễ dàng.</small>
      </div>
    </aside>
  );
};

export default HeroBookingCard;
