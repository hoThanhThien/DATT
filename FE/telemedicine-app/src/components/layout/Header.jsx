import { useAuth } from '../../context/AuthContext';
import './Header.css';

const Header = () => {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <header className="header">
      <div className="header-container">
        {/* TODO: Thêm Logo */}
        <div className="header-logo">
          <h2>Telemedicine</h2>
          {/* TODO: Thay bằng logo thật */}
        </div>

        {/* TODO: Thêm Navigation Menu */}
        <nav className="header-nav">
          {/* TODO: Thêm các link menu: Trang chủ, Đặt khám, Bác sĩ, Về chúng tôi, etc. */}
          <ul className="nav-menu">
            <li><a href="/">Trang chủ</a></li>
            <li><a href="/doctors">Bác sĩ</a></li>
            <li><a href="/specialties">Chuyên khoa</a></li>
            <li><a href="/about">Về chúng tôi</a></li>
          </ul>
        </nav>

        {/* User/Auth Section */}
        <div className="header-auth">
          {isAuthenticated ? (
            <div className="user-section">
              <span className="user-greeting">
                Xin chào, <strong>{user.name}</strong>
              </span>
              <div className="user-dropdown">
                <button className="user-avatar">
                  {user.name.charAt(0).toUpperCase()}
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
    </header>
  );
};

export default Header;
