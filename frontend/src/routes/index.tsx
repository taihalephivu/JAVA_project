import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

// Lazy load components
const Login = React.lazy(() => import('../pages/auth/Login'));
const Register = React.lazy(() => import('../pages/auth/Register'));
const Dashboard = React.lazy(() => import('../pages/dashboard/Dashboard'));
const TestList = React.lazy(() => import('../pages/tests/TestList'));
const TestDetail = React.lazy(() => import('../pages/tests/TestDetail'));
const AppointmentList = React.lazy(() => import('../pages/appointments/AppointmentList'));
const AppointmentDetail = React.lazy(() => import('../pages/appointments/AppointmentDetail'));
const Profile = React.lazy(() => import('../pages/profile/Profile'));

const AppRoutes = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/" />} />
        <Route path="/register" element={!isAuthenticated ? <Register /> : <Navigate to="/" />} />

        {/* Protected routes */}
        <Route
          path="/"
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/tests"
          element={isAuthenticated ? <TestList /> : <Navigate to="/login" />}
        />
        <Route
          path="/tests/:id"
          element={isAuthenticated ? <TestDetail /> : <Navigate to="/login" />}
        />
        <Route
          path="/appointments"
          element={isAuthenticated ? <AppointmentList /> : <Navigate to="/login" />}
        />
        <Route
          path="/appointments/:id"
          element={isAuthenticated ? <AppointmentDetail /> : <Navigate to="/login" />}
        />
        <Route
          path="/profile"
          element={isAuthenticated ? <Profile /> : <Navigate to="/login" />}
        />

        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </React.Suspense>
  );
};

export default AppRoutes; 