import React from 'react';
import { Outlet, Link } from 'react-router-dom';

const AdminLayout = () => {
    return (
        <div style={{ display: 'flex' }}>
            <nav style={{ borderRight: '1px solid #ccc', padding: '1rem', background: '#f0f0f0' }}>
                <h3>Menu ADMIN</h3>
                <ul>
                    <li><Link to="/admin">Dashboard</Link></li>
                    <li><Link to="/admin/manage-users">Quản lý User</Link></li>
                </ul>
            </nav>
            <main style={{ padding: '1rem', width: '100%' }}>
                <h2>Đây là Layout của Admin</h2>
                <hr />
                <Outlet /> {/* Nơi các trang con (Page) hiển thị */}
            </main>
        </div>
    );
};

export default AdminLayout; // <-- Dòng này SỬA LỖI