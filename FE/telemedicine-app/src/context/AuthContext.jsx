import React, { createContext, useState, useContext, useEffect } from 'react';  
import * as authService from '../services/auth.service';  
  
// Export AuthContext để các component có thể dùng useContext(AuthContext)
export const AuthContext = createContext();  
  
export const AuthProvider = ({ children }) => {  
    const [user, setUser] = useState(null);  
    const [loading, setLoading] = useState(true);
    const isAuthenticated = !!user;  
  
    // Khôi phục session khi app load
    useEffect(() => {
        const token = localStorage.getItem('token');
        const role = localStorage.getItem('role');
        const userId = localStorage.getItem('userId');
        
        if (token && role) {
            // Khôi phục user từ localStorage
            const userData = { 
                role,
                id: userId ? parseInt(userId) : null
            };
            setUser(userData);
        }
        setLoading(false);
    }, []);

    const login = async (username, password) => {  
        try {  
            const response = await authService.login(username, password);  
            // Backend trả về { token, role }
            const { token, role } = response.data;  
            localStorage.setItem('token', token);
            if (role) localStorage.setItem('role', role);
            
            // Giải mã JWT token để lấy user info (id, username, etc)
            try {
                const base64Url = token.split('.')[1];
                const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
                const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => {
                    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                }).join(''));
                
                const tokenData = JSON.parse(jsonPayload);
                console.log('Token decoded:', tokenData);
                
                // Tạo user object với đầy đủ thông tin
                const userData = { 
                    id: tokenData.userId || tokenData.sub || tokenData.id,
                    username: tokenData.sub || tokenData.username,
                    role: role || tokenData.role,
                    fullName: tokenData.fullName
                };
                
                // Lưu userId vào localStorage
                if (userData.id) {
                    localStorage.setItem('userId', userData.id.toString());
                }
                
                setUser(userData);
                return { success: true, user: userData };
            } catch (decodeError) {
                console.error('Token decode error:', decodeError);
                // Fallback nếu không decode được
                const userData = { role };
                setUser(userData);
                return { success: true, user: userData };
            }
        } catch (error) {  
            console.error('Login error:', error);  
            return { success: false, error: error.response?.data?.message || 'Đăng nhập thất bại' };  
        }  
    };  
  
    const logout = () => { 
        setUser(null); 
        localStorage.removeItem('userId');
        authService.logout();
    };  
  
    const value = { user, isAuthenticated, role: user?.role, login, logout, loading };  
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;  
};  
  
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
