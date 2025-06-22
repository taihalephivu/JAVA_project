import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import Home from './pages/public/Home';
import About from './pages/public/About';
import Packages from './pages/public/Packages';
import Contact from './pages/public/Contact';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import CustomerDashboard from './pages/dashboard/CustomerDashboard';
import AdminDashboard from './pages/dashboard/AdminDashboard';
import AppointmentList from './pages/appointments/AppointmentList';
import AppointmentForm from './pages/appointments/AppointmentForm';
import AppointmentDetail from './pages/appointments/AppointmentDetail';
import TestList from './pages/tests/TestList';
import TestForm from './pages/tests/TestForm';
import TestDetail from './pages/tests/TestDetail';
import TestResultList from './pages/testResults/TestResultList';
import TestResultForm from './pages/testResults/TestResultForm';
import TestResultDetail from './pages/testResults/TestResultDetail';
import UserList from './pages/users/UserList';
import UserDetail from './pages/users/UserDetail';
import Profile from './pages/profile/Profile';
import ProtectedRoute from './components/ProtectedRoute';
import { User } from './types';

// Helper để kiểm tra quyền
const isAdmin = (user: User | null) => user && (user.role === 'ROLE_ADMIN' || user.role === 'ROLE_STAFF' || user.role === 'ROLE_MANAGER');
const isCustomer = (user: User | null) => user && user.role === 'ROLE_CUSTOMER';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(() => {
    // Lấy user từ localStorage nếu có
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (user) localStorage.setItem('user', JSON.stringify(user));
    else localStorage.removeItem('user');
  }, [user]);

  // Component chuyển hướng dashboard phù hợp
  const DashboardRedirect: React.FC = () => {
    if (!user) return <Navigate to="/login" replace />;
    if (isAdmin(user)) return <Navigate to="/admin" replace />;
    if (isCustomer(user)) return <Navigate to="/customer" replace />;
    return <Navigate to="/" replace />;
  };

  // Route bảo vệ cho admin
  const AdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    if (!user) return <Navigate to="/login" replace />;
    if (!isAdmin(user)) return <Navigate to="/dashboard" replace />;
    return <>{children}</>;
  };

  // Route bảo vệ cho customer
  const CustomerRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    if (!user) return <Navigate to="/login" replace />;
    if (!isCustomer(user)) return <Navigate to="/dashboard" replace />;
    return <>{children}</>;
  };

  return (
    <Router>
      <MainLayout user={user} onLogout={() => setUser(null)}>
        <Routes>
          {/* Public */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/packages" element={<Packages />} />
          <Route path="/contact" element={<Contact />} />
          {/* Auth */}
          <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login onLogin={setUser} />} />
          <Route path="/register" element={user ? <Navigate to="/dashboard" /> : <Register onLogin={setUser} />} />
          {/* Dashboard chuyển hướng */}
          <Route path="/dashboard" element={<DashboardRedirect />} />
          {/* Customer dashboard và các chức năng */}
          <Route path="/customer" element={<CustomerRoute><CustomerDashboard /></CustomerRoute>} />
          <Route path="/appointments" element={<CustomerRoute><AppointmentList /></CustomerRoute>} />
          <Route path="/appointments/new" element={<CustomerRoute><AppointmentForm /></CustomerRoute>} />
          <Route path="/appointments/:id" element={<CustomerRoute><AppointmentDetail /></CustomerRoute>} />
          <Route path="/tests" element={<CustomerRoute><TestList /></CustomerRoute>} />
          <Route path="/tests/:id" element={<CustomerRoute><TestDetail /></CustomerRoute>} />
          <Route path="/test-results" element={<CustomerRoute><TestResultList /></CustomerRoute>} />
          <Route path="/test-results/:id" element={<CustomerRoute><TestResultDetail /></CustomerRoute>} />
          <Route path="/profile" element={<CustomerRoute><Profile /></CustomerRoute>} />
          {/* Admin dashboard và các chức năng */}
          <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
          <Route path="/admin/appointments" element={<AdminRoute><AppointmentList /></AdminRoute>} />
          <Route path="/admin/appointments/new" element={<AdminRoute><AppointmentForm /></AdminRoute>} />
          <Route path="/admin/appointments/:id" element={<AdminRoute><AppointmentDetail /></AdminRoute>} />
          <Route path="/admin/tests" element={<AdminRoute><TestList /></AdminRoute>} />
          <Route path="/admin/tests/new" element={<AdminRoute><TestForm /></AdminRoute>} />
          <Route path="/admin/tests/:id" element={<AdminRoute><TestDetail /></AdminRoute>} />
          <Route path="/admin/test-results" element={<AdminRoute><TestResultList /></AdminRoute>} />
          <Route path="/admin/test-results/new" element={<AdminRoute><TestResultForm /></AdminRoute>} />
          <Route path="/admin/test-results/:id" element={<AdminRoute><TestResultDetail /></AdminRoute>} />
          <Route path="/users" element={<AdminRoute><UserList /></AdminRoute>} />
          <Route path="/users/:id" element={<AdminRoute><UserDetail /></AdminRoute>} />
          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </MainLayout>
    </Router>
  );
};

export default App; 