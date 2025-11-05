import React, { createContext, useState, useContext } from 'react';

// 1. Tạo Context
const AuthContext = createContext();

// 2. Tạo Provider (Component "bọc")
export const AuthProvider = ({ children }) => {
    // Giả lập trạng thái đăng nhập
    // Sau này, bạn sẽ lấy 'user' và 'role' từ API khi login
    const [user, setUser] = useState({
        id: 1,
        name: "Hồ Thành Thiện",
        role: "patient" // Thử đổi 'patient' thành 'admin' hoặc 'doctor' để test
    });
    // const [user, setUser] = useState(null); // Trạng thái khi chưa đăng nhập

    const isAuthenticated = !!user; // Kiểm tra đã đăng nhập chưa

    // Hàm giả lập login
    const login = (email, password) => {
        // TODO: Gọi API login (từ auth.service.js)
        // Nếu thành công:
        const fakeUser = { id: 1, name: "Tên User", role: "patient" }; // Lấy role từ API
        setUser(fakeUser);
    };

    // Hàm logout
    const logout = () => {
        setUser(null);
    };

    // 3. Giá trị cung cấp cho toàn app
    const value = {
        user,
        isAuthenticated,
        role: user ? user.role : null, // Cung cấp 'role'
        login,
        logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// 4. Custom hook (tiện ích)
export const useAuth = () => {
    return useContext(AuthContext);
};