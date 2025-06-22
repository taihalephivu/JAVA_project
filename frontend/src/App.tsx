import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import Home from './pages/public/Home';
import About from './pages/public/About';
import Packages from './pages/public/Packages';
import Contact from './pages/public/Contact';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import CustomerDashboard from './pages/dashboard/CustomerDashboard';
import AdminDashboard from './pages/dashboard/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import { User } from './types';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <Router>
      <MainLayout user={user} onLogout={() => setUser(null)}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/packages" element={<Packages />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login onLogin={setUser} />} />
          <Route path="/register" element={<Register onLogin={setUser} />} />
          <Route path="/dashboard" element={
            <ProtectedRoute user={user}>
              {user?.role === 'ROLE_ADMIN' || user?.role === 'ROLE_STAFF' || user?.role === 'ROLE_MANAGER'
                ? <AdminDashboard />
                : <CustomerDashboard />}
            </ProtectedRoute>
          } />
          {/* Các route khác sẽ bổ sung sau */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </MainLayout>
    </Router>
  );
};

export default App; 