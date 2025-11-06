import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext.jsx' // 1. Import AuthProvider
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter> {/* 2. Bọc app bằng Router */}
            <AuthProvider> {/* 3. Bọc app bằng AuthContext */}
                <App />
            </AuthProvider>
        </BrowserRouter>
    </React.StrictMode>,
)