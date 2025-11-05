import { Routes, Route } from 'react-router-dom'

// Layouts
import PublicLayout from './layouts/PublicLayout'
import PatientLayout from './layouts/PatientLayout'
import DoctorLayout from './layouts/DoctorLayout'
import AdminLayout from './layouts/AdminLayout'

// Public Pages
import HomePage from './pages/public/HomePage'
import LoginPage from './pages/public/LoginPage'

// Patient Pages
import PatientDashboardPage from './pages/patient/PatientDashboardPage'

// Doctor Pages
import DoctorDashboardPage from './pages/doctor/DoctorDashboardPage'

// Admin Pages
import DashboardPage from './pages/admin/DashboardPage'

// Component bảo vệ
import ProtectedRoute from './components/ProtectedRoute'

function App() {
    return (
        <Routes>
            {/* ---------------- PUBLIC ROUTES ---------------- */}
            <Route path="/" element={<PublicLayout />}>
                <Route index element={<HomePage />} />
                <Route path="login" element={<LoginPage />} />
                {/* Thêm các trang public khác ở đây (register, doctors...) */}
            </Route>

            {/* ---------------- PATIENT ROUTES (Được bảo vệ) ---------------- */}
            <Route
                path="/patient"
                element={
                    <ProtectedRoute allowedRoles={['patient']}>
                        <PatientLayout />
                    </ProtectedRoute>
                }
            >
                <Route index element={<PatientDashboardPage />} />
                {/* <Route path="book-appointment" element={<BookAppointmentPage />} /> */}
            </Route>

            {/* ---------------- DOCTOR ROUTES (Được bảo vệ) ---------------- */}
            <Route
                path="/doctor"
                element={
                    <ProtectedRoute allowedRoles={['doctor']}>
                        <DoctorLayout />
                    </ProtectedRoute>
                }
            >
                <Route index element={<DoctorDashboardPage />} />
                {/* <Route path="schedule" element={<SchedulePage />} /> */}
            </Route>

            {/* ---------------- ADMIN ROUTES (Được bảo vệ) ---------------- */}
            <Route
                path="/admin"
                element={
                    <ProtectedRoute allowedRoles={['admin']}>
                        <AdminLayout />
                    </ProtectedRoute>
                }
            >
                <Route index element={<DashboardPage />} />
                {/* <Route path="manage-users" element={<ManageUsersPage />} /> */}
            </Route>

        </Routes>
    )
}

export default App