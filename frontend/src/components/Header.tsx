import React from 'react';
import { User } from '../types';
import NotificationBell from './NotificationBell';

interface HeaderProps {
  user: User | null;
  onLogout?: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, onLogout }) => (
  <header style={{ background: '#1976d2', color: '#fff', padding: '12px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
    <div style={{ fontWeight: 700, fontSize: 22, letterSpacing: 1 }}>DNA Center</div>
    <nav style={{ display: 'flex', alignItems: 'center' }}>
      <a href="/" style={{ color: '#fff', marginRight: 18 }}>Trang chủ</a>
      <a href="/packages" style={{ color: '#fff', marginRight: 18 }}>Gói xét nghiệm</a>
      <a href="/posts" style={{ color: '#fff', marginRight: 18 }}>Bài viết</a>
      <a href="/about" style={{ color: '#fff', marginRight: 18 }}>Giới thiệu</a>
      <a href="/contact" style={{ color: '#fff', marginRight: 18 }}>Liên hệ</a>
      {user ? (
        <>
          <NotificationBell />
          <a href="/dashboard" style={{ color: '#fff', marginRight: 18 }}>Dashboard</a>
          <button onClick={onLogout} style={{ color: '#fff', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }}>Đăng xuất</button>
        </>
      ) : (
        <>
          <a href="/login" style={{ color: '#fff', marginRight: 18 }}>Đăng nhập</a>
          <a href="/register" style={{ color: '#fff' }}>Đăng ký</a>
        </>
      )}
    </nav>
  </header>
);

export default Header; 