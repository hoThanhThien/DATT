import React from 'react';
import { Outlet, Link } from 'react-router-dom';

const DoctorLayout = () => {
    return (
        <div style={{ display: 'flex' }}>
            <nav style={{ borderRight: '1px solid #ccc', padding: '1rem', background: '#e6f7ff' }}>
                <h3>Menu Bác sĩ</h3>
                <ul>
                    <li><Link to="/doctor">Dashboard</Link></li>
                </ul>
            </nav>
            <main style={{ padding: '1rem', width: '100%' }}>
                <h2>Đây là Layout của Bác sĩ</h2>
                <hr />
                <Outlet />
            </main>
        </div>
    );
};

export default DoctorLayout; // <-- Phải có dòng này