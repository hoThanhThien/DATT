import { useAuth } from '../../context/AuthContext';
import { useState } from 'react';
import './Header.css';

const Header = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <header className="header">
      {/* top strip: social / hotline / app links */}
      <div className="top-strip">
        <div className="top-inner">
          <div className="top-left">📞 <strong>Hỗ trợ đặt khám</strong> <span className="top-phone">1900 2115</span></div>
          <div className="top-right">
            <a href="#">Tải ứng dụng</a>
            <span className="sep">|</span>
            <a href="#">Tiếng Việt</a>
          </div>
        </div>
      </div>

      <div className="header-container">
        <div className="header-logo">
          {/* Prefer an image logo at /public/logo.png - fallback to text */}
          <a href="/" className="logo-link">
            <img src="/logo.png" alt="Telemedicine logo" className="site-logo" onError={(e)=>{e.currentTarget.style.display='none'}} />
            <h2 className="logo-text">Telemedicine</h2>
          </a>
        </div>

        <button className="mobile-toggle" aria-label="Open menu" onClick={() => setOpen(!open)}>
          <span className="hamburger" />
        </button>

        <nav className={`header-nav ${open ? 'open' : ''}`}>
          <ul className="nav-menu">
            <li><a href="/">Trang chủ</a></li>
            <li><a href="/doctors">Bác sĩ</a></li>
            <li><a href="/specialties">Chuyên khoa</a></li>
            <li><a href="/about">Về chúng tôi</a></li>
          </ul>
        </nav>

        <div className="header-auth">
          {isAuthenticated ? (
            <div className="user-section">
              <span className="user-greeting">
                Xin chào, <strong>{user.name}</strong>
              </span>
              <div className="user-dropdown">
                <button className="user-avatar">
                  {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                </button>
                <div className="dropdown-menu">
                  <a href="/profile">Thông tin cá nhân</a>
                  <a href="/appointments">Lịch hẹn</a>
                  <a href="/settings">Cài đặt</a>
                  <button onClick={logout} className="btn-logout">
                    Đăng xuất
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="auth-buttons">
              <a href="/login" className="btn-login-link">
                Đăng nhập
              </a>
              <a href="/register" className="btn-register-link">
                Đăng ký
              </a>
            </div>
          )}
        </div>
      </div>

      {/* ticker / announcement similar to Medpro */}
      <div className="header-ticker">Đặt Giúp Việc Cá Nhân hướng dẫn, hỗ trợ bạn đi khám từ lúc vào viện đến khi kết thúc khám. Gọi ngay 1900 2267!</div>
    </header>
  );
};

export default Header;
