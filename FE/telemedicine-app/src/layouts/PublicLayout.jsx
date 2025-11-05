import React from 'react';
import { Outlet, Link } from 'react-router-dom';

const PublicLayout = () => {
    return (
        <div>
            <nav style={{ padding: '1rem', background: '#eee' }}>
                <Link to="/">Trang chủ</Link> |
                <Link to="/login">Đăng nhập</Link> |
                <Link to="/patient">Vào trang Bệnh nhân (Test)</Link> |
                <Link to="/admin">Vào trang Admin (Test)</Link>
            </nav>
            <hr />
            <main style={{ padding: '1rem' }}>
                <Outlet />
            </main>
        </div>
    );
};

export default PublicLayout; // <-- Phải có dòng này