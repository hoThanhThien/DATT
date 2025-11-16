import { Routes, Route } from 'react-router-dom'

// Layouts
import PublicLayout from './layouts/PublicLayout'
import PatientLayout from './layouts/PatientLayout'
import DoctorLayout from './layouts/DoctorLayout'
import AdminLayout from './layouts/AdminLayout'

// Public Pages
import HomePage from './pages/public/HomePage'
import LoginPage from './pages/public/LoginPage'
import RegisterPage from './pages/public/RegisterPage'
import ChatPage from './pages/public/ChatPage'

// Patient Pages
import PatientDashboardPage from './pages/patient/PatientDashboardPage'
import MedicalRecordPage from './pages/patient/MedicalRecordPage'
import MedicalRecordDetailPage from './pages/patient/MedicalRecordDetailPage'

// Booking Pages
import BookingPage from './pages/booking/BookingPage'
import BookingSuccess from './pages/booking/BookingSuccess'
import BookingDetail from './pages/booking/BookingDetail'
import PaymentPage from './pages/payment/PaymentPage'
import PaymentSuccess from './pages/payment/PaymentSuccess'

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
                <Route path="register" element={<RegisterPage />} />
                {/* TODO: Change medical-records to require login - Move to PATIENT ROUTES when needed */}
                <Route path="medical-records" element={<MedicalRecordPage />} />
                <Route path="medical-records/:id" element={<MedicalRecordDetailPage />} />
                <Route path="chat" element={<ChatPage />} />
                
                {/* Booking Routes - Public Access */}
                <Route path="booking" element={<BookingPage />} />
                <Route path="booking-success" element={<BookingSuccess />} />
                <Route path="booking/:id" element={<BookingDetail />} />
                <Route path="payment" element={<PaymentPage />} />
                <Route path="payment-success" element={<PaymentSuccess />} />
                
                {/* Thêm các trang public khác ở đây (doctors...) */}
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
                {/* TODO: Uncomment line below when medical-records requires login protection */}
                {/* <Route path="medical-records" element={<MedicalRecordPage />} /> */}
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