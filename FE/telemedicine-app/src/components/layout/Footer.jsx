import './Footer.css';

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <h3>Telemedicine</h3>
          <p>Kết nối bệnh nhân, bác sĩ và cơ sở y tế - an toàn & tiện lợi.</p>
        </div>

        <div className="footer-links">
          <div>
            <h4>Về chúng tôi</h4>
            <a href="/about">Giới thiệu</a>
            <a href="/contact">Liên hệ</a>
          </div>
          <div>
            <h4>Hỗ trợ</h4>
            <a href="/help">Hướng dẫn</a>
            <a href="/privacy">Chính sách</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <small>© {new Date().getFullYear()} Telemedicine — Bản quyền thuộc về bạn</small>
      </div>
    </footer>
  );
};

export default Footer;
