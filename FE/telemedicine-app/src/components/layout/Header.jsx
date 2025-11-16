import './Header.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import UserMenu from './UserMenu';
import logo from '../../assets/logo/logo.png';

const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleDropdown = (idx) => {
    setDropdownOpen(dropdownOpen === idx ? null : idx);
  };

  const handleAccountClick = () => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  };

  return (
      <header className="header">
        <div className="header-main">
          <div className="header-left">
            <a href="/" className="logo-link">
              <img src={logo} alt="Telemedicine logo" className="site-logo" />
            </a>
          </div>
          <div className="header-center">
            <input className="search-bar" type="search" placeholder="Tìm kiếm cơ sở y tế" />
          </div>
          <div className="header-right">
            <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
              ☰
            </button>
            <nav className={`main-nav${menuOpen ? ' open' : ''}`}>
              <ul>
                <li><a href="#">Cơ sở y tế</a></li>
                <li className="nav-dropdown"
                    onMouseEnter={() => setDropdownOpen(1)}
                    onMouseLeave={() => setDropdownOpen(null)}
                    onClick={() => handleDropdown(1)}
                    aria-haspopup="true"
                    aria-expanded={dropdownOpen === 1}
                >
                  <a href="#">Dịch vụ y tế ▼</a>
                  <ul className="dropdown-menu" style={{ display: dropdownOpen === 1 ? 'block' : 'none' }}>
                    <li><a href="#">Đặt lịch xét nghiệm</a></li>
                    <li><a href="#">Mua thuốc tại An Khang</a></li>
                    
                  </ul>
                </li>
                <li className="nav-dropdown"
                    onMouseEnter={() => setDropdownOpen(2)}
                    onMouseLeave={() => setDropdownOpen(null)}
                    onClick={() => handleDropdown(2)}
                    aria-haspopup="true"
                    aria-expanded={dropdownOpen === 2}
                >
                  <a href="#">Liên hệ ▼</a>
                  <ul className="dropdown-menu" style={{ display: dropdownOpen === 2 ? 'block' : 'none' }}>
                    <li><a href="/chat">Nhắn tin</a></li>
                    <li><a href="#">Gọi video với bác sĩ</a></li>
                  </ul>
                </li>
                <li><a href="/medical-records">Hồ sơ khám bệnh</a></li>
                <li><a href="/booking">Đặt lịch</a></li>
                <li>
                  {isAuthenticated ? (
                    <UserMenu />
                  ) : (
                    <button className="btn-account-nav" onClick={handleAccountClick}>
                      👤 Tài khoản
                    </button>
                  )}
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
  );
};

export default Header;
