import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles }) => {
    const { isAuthenticated, role } = useAuth();
    const location = useLocation();

    if (!isAuthenticated) {
        // Nếu chưa đăng nhập, đá về trang login
        // state: lưu lại trang đang định vào, để login xong quay lại
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (!allowedRoles.includes(role)) {
        // Nếu đã đăng nhập nhưng SAI VAI TRÒ
        // Đá về trang "Không có quyền" (hoặc trang chủ)
        return <Navigate to="/" replace />; // Tạm thời đá về trang chủ
    }

    // Nếu đã đăng nhập + ĐÚNG VAI TRÒ
    return children;
};

export default ProtectedRoute;