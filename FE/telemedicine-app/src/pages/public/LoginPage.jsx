import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './LoginPage.css';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await login(username, password);
      
      if (result.success) {
        console.log('Login successful:', result.user);
        
        // Chuyển hướng dựa trên role (backend trả về uppercase)
        const role = result.user?.role?.toUpperCase();
        if (role === 'ADMIN') {
          navigate('/admin/dashboard');
        } else if (role === 'DOCTOR') {
          navigate('/doctor/dashboard');
        } else if (role === 'PATIENT') {
          navigate('/patient/dashboard');
        } else {
          navigate('/');
        }
      } else {
        setError(result.error || 'Đăng nhập thất bại');
      }
      
    } catch (err) {
      console.error('Login error:', err);
      setError('Đã xảy ra lỗi. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <h1>Đăng nhập</h1>
            <p>Chào mừng bạn đến với hệ thống Telemedicine</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form" aria-live="polite" aria-busy={loading}>
            {error && (
              <div className="error-message" role="alert" aria-live="assertive" id="login-error">
                {error}
              </div>
            )}

            <div className="form-group">
              <label htmlFor="username">Email/Số điện thoại</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Nhập email hoặc số điện thoại"
                required
                autoComplete="username"
                aria-describedby={error ? 'login-error' : undefined}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Mật khẩu</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Nhập mật khẩu"
                required
                autoComplete="current-password"
                aria-describedby={error ? 'login-error' : undefined}
              />
            </div>

            <button
              type="submit"
              className="btn-login"
              disabled={loading}
              aria-disabled={loading}
            >
              {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
            </button>

            {/* TODO: Thêm link "Quên mật khẩu?" */}
            {/* TODO: Thêm link chuyển hướng đến trang đăng ký */}
            {/* TODO: Thêm option đăng nhập bằng Google/Facebook nếu cần */}
            
            <div className="login-footer">
              <p>Chưa có tài khoản? <a href="/register">Đăng ký ngay</a></p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;