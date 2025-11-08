import './Header.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import facebookIcon from '../../assets/facebook.png';
import tiktokIcon from '../../assets/tiktok.svg';
import zaloIcon from '../../assets/zalo.svg';
import youtubeIcon from '../../assets/youtube.svg';

const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  // Replace with real auth logic
  const isAuthenticated = false;

  const handleDropdown = (idx) => {
    setDropdownOpen(dropdownOpen === idx ? null : idx);
  };

  const handleAccountClick = () => {
    if (!isAuthenticated) {
      navigate('/login');
    } else {
      // Show account menu or profile
    }
  };

  return (
      <header className="header">
        {/* Top social bar */}
        <div className="top-strip">
          <div className="top-inner">
            <div className="top-social">
                <a href="https://www.tiktok.com/" target="_blank" rel="noopener noreferrer" aria-label="TikTok - mở trong tab mới">
                  <img src={tiktokIcon} alt="TikTok" style={{height:18,verticalAlign:'middle',marginRight:4}} />
                  Tiktok
                </a>
                <span style={{margin:'0 8px',color:'#b0bec5'}}>|</span>
                <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" aria-label="Facebook - mở trong tab mới">
                  <img src={facebookIcon} alt="Facebook" style={{height:18,verticalAlign:'middle',marginRight:4}} />
                  Facebook
                </a>
                <span style={{margin:'0 8px',color:'#b0bec5'}}>|</span>
                <a href="https://zalo.me/" target="_blank" rel="noopener noreferrer" aria-label="Zalo - mở trong tab mới">
                  <img src={zaloIcon} alt="Zalo" style={{height:18,verticalAlign:'middle',marginRight:4}} />
                  Zalo
                </a>
                <span style={{margin:'0 8px',color:'#b0bec5'}}>|</span>
                <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer" aria-label="YouTube - mở trong tab mới">
                  <img src={youtubeIcon} alt="YouTube" style={{height:18,verticalAlign:'middle',marginRight:4}} />
                  Youtube
                </a>
            </div>
            <div className="top-actions">
              <button className="btn-account" onClick={handleAccountClick}>👤 Tài khoản</button>
            </div>
          </div>
        </div>

        <div className="header-main">
          <div className="header-left">
            <a href="/" className="logo-link">
              <img src="/logo.png" alt="Telemedicine logo" className="site-logo" />
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
                <li className="nav-dropdown"
                    onMouseEnter={() => setDropdownOpen(0)}
                    onMouseLeave={() => setDropdownOpen(null)}
                    onClick={() => handleDropdown(0)}
                    aria-haspopup="true"
                    aria-expanded={dropdownOpen === 0}
                >
                  <a href="#">Cơ sở y tế ▼</a>
                  <ul className="dropdown-menu" style={{ display: dropdownOpen === 0 ? 'block' : 'none' }}>
                    <li><a href="#">Đặt khám tại cơ sở</a></li>
                    <li><a href="#">Đặt khám chuyên khoa</a></li>
                    <li><a href="#">Gọi video với bác sĩ</a></li>
                    {/* ...other items... */}
                  </ul>
                </li>
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
                    {/* ...other items... */}
                  </ul>
                </li>
                <li><a href="#">Khám sức khỏe doanh nghiệp</a></li>
                <li><a href="#">Tin tức</a></li>
                <li><a href="#">Hướng dẫn</a></li>
                <li><a href="#">Liên hệ hợp tác</a></li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
  );
};

export default Header;
