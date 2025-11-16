import { useEffect, useState } from 'react';
import { getUsers } from '../services/user.service';
import './UserList.css';

/**
 * UserList Component
 * Hiển thị danh sách users với xử lý loading và error
 */
const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getUsers();
        setUsers(data);
      } catch (err) {
        setError(err.response?.data?.message || err.message || 'Không thể tải danh sách users');
        console.error('Error fetching users:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Render loading state
  if (loading) {
    return (
      <div className="user-list-container">
        <div className="loading">
          <div className="spinner"></div>
          <p>Đang tải danh sách users...</p>
        </div>
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div className="user-list-container">
        <div className="error">
          <h3>⚠️ Có lỗi xảy ra</h3>
          <p>{error}</p>
          <button onClick={() => window.location.reload()}>
            Thử lại
          </button>
        </div>
      </div>
    );
  }

  // Render empty state
  if (users.length === 0) {
    return (
      <div className="user-list-container">
        <div className="empty-state">
          <p>Không có users nào</p>
        </div>
      </div>
    );
  }

  // Render users list
  return (
    <div className="user-list-container">
      <h2>Danh sách Users ({users.length})</h2>
      <div className="user-grid">
        {users.map((user) => (
          <div key={user.id} className="user-card">
            <div className="user-header">
              <h3>{user.fullName || user.email}</h3>
              <span className={`role-badge role-${user.role?.toLowerCase()}`}>
                {user.role}
              </span>
            </div>
            <div className="user-details">
              <p><strong>Email:</strong> {user.email}</p>
              {user.phoneNumber && (
                <p><strong>Điện thoại:</strong> {user.phoneNumber}</p>
              )}
              {user.gender && (
                <p><strong>Giới tính:</strong> {user.gender}</p>
              )}
              {user.dob && (
                <p><strong>Ngày sinh:</strong> {new Date(user.dob).toLocaleDateString('vi-VN')}</p>
              )}
              {user.insuranceNumber && (
                <p><strong>Số BHYT:</strong> {user.insuranceNumber}</p>
              )}
              {user.specialization && (
                <p><strong>Chuyên khoa:</strong> {user.specialization}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserList;
