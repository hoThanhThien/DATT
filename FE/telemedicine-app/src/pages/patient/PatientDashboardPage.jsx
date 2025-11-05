import React from 'react';
import { useAuth } from '../../context/AuthContext';

const PatientDashboardPage = () => {
    const { user } = useAuth(); // Lấy thông tin user từ context

    return (
        <div>
            <h2>Chào mừng, {user?.name}!</h2>
            <p>Đây là trang quản lý của Bệnh nhân.</p>
            <p>Vai trò của bạn: {user?.role}</p>
        </div>
    );
};

export default PatientDashboardPage;