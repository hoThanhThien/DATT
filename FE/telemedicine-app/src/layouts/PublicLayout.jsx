import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/layout/Header';

const PublicLayout = () => {
    return (
        <div>
            <Header />
            <main style={{ padding: '1rem' }}>
                <Outlet />
            </main>
        </div>
    );
};

export default PublicLayout;