import { useState } from 'react';
import './RegisterPage.css';

const RegisterPage = () => {
  const [form, setForm] = useState({
    email: '',
    phoneNumber: '',
    password: '',
    fullName: '',
    gender: '',
    dob: '',
    insuranceNumber: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    // TODO: Call API to register
    setTimeout(() => {
      setLoading(false);
      alert('Đăng ký thành công!');
    }, 1000);
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <div className="register-card">
          <div className="register-header">
            <h1>Đăng ký tài khoản</h1>
            <p className="register-desc">Tạo tài khoản để đặt lịch khám online, quản lý hồ sơ sức khỏe và nhận hỗ trợ tốt nhất từ hệ thống.</p>
          </div>
          <form className="register-form" onSubmit={handleSubmit}>
            {error && <div className="error-message">{error}</div>}
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" value={form.email} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="phoneNumber">Số điện thoại</label>
                <input type="text" id="phoneNumber" name="phoneNumber" value={form.phoneNumber} onChange={handleChange} required />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="password">Mật khẩu</label>
                <input type="password" id="password" name="password" value={form.password} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="fullName">Họ và tên</label>
                <input type="text" id="fullName" name="fullName" value={form.fullName} onChange={handleChange} required />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="gender">Giới tính</label>
                <select id="gender" name="gender" value={form.gender} onChange={handleChange} required>
                  <option value="">Chọn giới tính</option>
                  <option value="female">Nữ</option>
                  <option value="male">Nam</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="dob">Ngày sinh</label>
                <input type="date" id="dob" name="dob" value={form.dob} onChange={handleChange} required />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="insuranceNumber">Số thẻ BHYT</label>
              <input type="text" id="insuranceNumber" name="insuranceNumber" value={form.insuranceNumber} onChange={handleChange} required />
            </div>
            <button type="submit" className="btn-register" disabled={loading}>
              {loading ? 'Đang đăng ký...' : 'Đăng ký'}
            </button>
            <div className="register-footer">
              <p>Đã có tài khoản? <a href="/login">Đăng nhập ngay</a></p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
