import React from 'react';
import { Outlet, Link } from 'react-router-dom';
// import PatientSidebar from '../components/features/layout/PatientSidebar';
// import Header from '../components/features/layout/Header';

const PatientLayout = () => {
    return (
        <div style={{ display: 'flex' }}>
            {/* <PatientSidebar /> */}
            <nav style={{ borderRight: '1px solid #ccc', padding: '1rem' }}>
                <h3>Menu Bệnh nhân</h3>
                <ul>
                    <li><Link to="/patient">Dashboard</Link></li>
                    <li><Link to="/patient/book-appointment">Đặt lịch</Link></li>
                    <li><Link to="/">Về trang chủ</Link></li>
                </ul>
            </nav>

            <main style={{ padding: '1rem', width: '100%' }}>
                {/* <Header /> */}
                <p>Đây là Header chung cho Bệnh nhân</p>
                <hr />

                {/* Đây là nơi nội dung của trang con (Page) sẽ hiển thị */}
                <Outlet />
            </main>
        </div>
    );
};

export default PatientLayout;