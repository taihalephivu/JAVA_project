import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import MainLayout from '../components/layout/MainLayout';
import ProtectedRoute from '../components/common/ProtectedRoute';
import Loading from '../components/ui/Loading';

// Public pages
const Home = React.lazy(() => import('../pages/public/Home'));
const Login = React.lazy(() => import('../pages/auth/Login'));
const Register = React.lazy(() => import('../pages/auth/Register'));
const Unauthorized = React.lazy(() => import('../pages/public/Unauthorized'));

// Customer pages
const CustomerDashboard = React.lazy(() => import('../pages/customer/Dashboard'));
const CustomerTests = React.lazy(() => import('../pages/customer/Tests'));
const CustomerTestDetail = React.lazy(() => import('../pages/customer/TestDetail'));
const CustomerAppointments = React.lazy(() => import('../pages/customer/Appointments'));
const CustomerAppointmentDetail = React.lazy(() => import('../pages/customer/AppointmentDetail'));
const CustomerProfile = React.lazy(() => import('../pages/customer/Profile'));
const CustomerBookTest = React.lazy(() => import('../pages/customer/BookAppointment'));

// Admin pages
const AdminDashboard = React.lazy(() => import('../pages/admin/Dashboard'));
const AdminUsers = React.lazy(() => import('../pages/admin/Users'));
const AdminTests = React.lazy(() => import('../pages/admin/Tests'));
const AdminTestTypes = React.lazy(() => import('../pages/admin/TestTypes'));
const AdminAppointments = React.lazy(() => import('../pages/admin/Appointments'));
const AdminReports = React.lazy(() => import('../pages/admin/Reports'));

const AppRoutes = () => {
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);

  return (
    <React.Suspense fallback={<Loading message="Đang tải trang..." />}>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/dashboard" />} />
        <Route path="/register" element={!isAuthenticated ? <Register /> : <Navigate to="/dashboard" />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* Customer routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute requiredRoles={['ROLE_CUSTOMER', 'ROLE_STAFF', 'ROLE_MANAGER', 'ROLE_ADMIN']}>
              <MainLayout>
                {user?.role === 'ROLE_CUSTOMER' ? <CustomerDashboard /> : <AdminDashboard />}
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/tests"
          element={
            <ProtectedRoute requiredRoles={['ROLE_CUSTOMER', 'ROLE_STAFF', 'ROLE_MANAGER', 'ROLE_ADMIN']}>
              <MainLayout>
                {user?.role === 'ROLE_CUSTOMER' ? <CustomerTests /> : <AdminTests />}
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/tests/:id"
          element={
            <ProtectedRoute requiredRoles={['ROLE_CUSTOMER', 'ROLE_STAFF', 'ROLE_MANAGER', 'ROLE_ADMIN']}>
              <MainLayout>
                {user?.role === 'ROLE_CUSTOMER' ? <CustomerTestDetail /> : <AdminTests />}
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/tests/new"
          element={
            <ProtectedRoute requiredRoles={['ROLE_CUSTOMER']}>
              <MainLayout>
                <CustomerBookTest />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/appointments"
          element={
            <ProtectedRoute requiredRoles={['ROLE_CUSTOMER', 'ROLE_STAFF', 'ROLE_MANAGER', 'ROLE_ADMIN']}>
              <MainLayout>
                {user?.role === 'ROLE_CUSTOMER' ? <CustomerAppointments /> : <AdminAppointments />}
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/appointments/:id"
          element={
            <ProtectedRoute requiredRoles={['ROLE_CUSTOMER', 'ROLE_STAFF', 'ROLE_MANAGER', 'ROLE_ADMIN']}>
              <MainLayout>
                {user?.role === 'ROLE_CUSTOMER' ? <CustomerAppointmentDetail /> : <AdminAppointments />}
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <MainLayout>
                {user?.role === 'ROLE_CUSTOMER' ? <CustomerProfile /> : <CustomerProfile />}
              </MainLayout>
            </ProtectedRoute>
          }
        />

        {/* Admin-only routes */}
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute requiredRoles={['ROLE_ADMIN']}>
              <MainLayout>
                <AdminUsers />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/test-types"
          element={
            <ProtectedRoute requiredRoles={['ROLE_ADMIN', 'ROLE_MANAGER']}>
              <MainLayout>
                <AdminTestTypes />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/reports"
          element={
            <ProtectedRoute requiredRoles={['ROLE_ADMIN', 'ROLE_MANAGER']}>
              <MainLayout>
                <AdminReports />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </React.Suspense>
  );
};

export default AppRoutes; 