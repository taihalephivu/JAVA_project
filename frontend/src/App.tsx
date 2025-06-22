import React, { useState } from 'react';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import CustomerDashboard from './pages/CustomerDashboard';
import AdminDashboard from './pages/AdminDashboard';
import MainLayout from './components/MainLayout';
import { User } from './types';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [page, setPage] = useState<'login' | 'register' | 'dashboard'>('login');

  // Giả lập đăng nhập, thực tế sẽ lấy từ localStorage hoặc context
  const handleLogin = (user: User) => {
    setUser(user);
    setPage('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setPage('login');
  };

  let content;
  if (!user) {
    content = page === 'register'
      ? <Register onLogin={handleLogin} onSwitch={() => setPage('login')} />
      : <Login onLogin={handleLogin} onSwitch={() => setPage('register')} />;
  } else {
    content = user.role === 'ROLE_CUSTOMER' ? <CustomerDashboard /> : <AdminDashboard />;
  }

  return (
    <MainLayout user={user} onLogout={user ? handleLogout : undefined}>
      {content}
    </MainLayout>
  );
};

export default App; 