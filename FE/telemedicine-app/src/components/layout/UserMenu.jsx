import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './UserMenu.css';

const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const menuRef = useRef(null);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Đóng menu khi click bên ngoài
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleLogout = () => {
    logout();
    setShowLogoutModal(false);
    navigate('/login');
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    const parts = name.split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  const getDisplayName = () => {
    if (user?.fullName) return user.fullName;
    if (user?.email) return user.email;
    if (user?.role) return user.role;
    return 'User';
  };

  // Debug log
  console.log('UserMenu render - showLogoutModal:', showLogoutModal);

  return (
    <>
      <div className="user-menu-container" ref={menuRef}>
        <button 
          className="user-avatar-btn"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="User menu"
        >
          <div className="user-avatar">
            {getInitials(user?.fullName)}
          </div>
          <span className="user-name">{getDisplayName()}</span>
          <span className={`dropdown-arrow ${isOpen ? 'open' : ''}`}>▼</span>
        </button>

        {isOpen && (
          <div className="user-dropdown">
            <div className="dropdown-header">
              <div className="user-info">
                <strong>{getDisplayName()}</strong>
                {user?.email && <small>{user.email}</small>}
                {user?.role && (
                  <span className={`role-badge role-${user.role.toLowerCase()}`}>
                    {user.role}
                  </span>
                )}
              </div>
            </div>
            
            <div className="dropdown-divider"></div>
            
            <div className="user-dropdown-menu">
              <button 
                className="dropdown-item"
                onClick={() => {
                  setIsOpen(false);
                  navigate('/profile');
                }}
              >
                <span className="item-icon">👤</span>
                Thông tin cá nhân
              </button>
              
              <button 
                className="dropdown-item"
                onClick={() => {
                  setIsOpen(false);
                  navigate('/settings');
                }}
              >
                <span className="item-icon">⚙️</span>
                Cài đặt
              </button>
              
              <div className="dropdown-divider"></div>
              
              <button 
                className="dropdown-item logout-item"
                onClick={() => {
                  console.log('Đăng xuất clicked, showing modal...');
                  setIsOpen(false);
                  setShowLogoutModal(true);
                }}
              >
                <span className="item-icon">🚪</span>
                Đăng xuất
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modal đăng xuất */}
      {showLogoutModal && (
        <div className="modal-overlay" onClick={() => setShowLogoutModal(false)} style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Xác nhận đăng xuất</h3>
              <button 
                className="modal-close"
                onClick={() => setShowLogoutModal(false)}
              >
                ✕
              </button>
            </div>
            
            <div className="modal-body">
              <p>Bạn có chắc chắn muốn đăng xuất khỏi hệ thống?</p>
            </div>
            
            <div className="modal-footer">
              <button 
                className="btn-cancel"
                onClick={() => setShowLogoutModal(false)}
              >
                Hủy
              </button>
              <button 
                className="btn-logout"
                onClick={handleLogout}
              >
                Đăng xuất
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserMenu;
