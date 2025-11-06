import React, { createContext, useState, useContext } from 'react';  
import * as authService from '../services/auth.service';  
  
const AuthContext = createContext();  
  
export const AuthProvider = ({ children }) => {  
    const [user, setUser] = useState(null);  
    const isAuthenticated = !!user;  
  
    const login = async (username, password) => {  
        try {  
            const response = await authService.login(username, password);  
            const { token, user: userData } = response.data;  
            localStorage.setItem('token', token);  
            setUser(userData);  
            return { success: true, user: userData };  
        } catch (error) {  
            console.error('Login error:', error);  
            return { success: false, error: error.response?.data?.message || 'Login failed' };  
        }  
    };  
  
    const logout = () => { setUser(null); };  
  
    const value = { user, isAuthenticated, role: user?.role, login, logout };  
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;  
};  
  
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
