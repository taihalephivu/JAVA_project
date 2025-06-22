import React from 'react';
import { User } from '../types';

interface HeaderProps {
  user: User | null;
  onLogout?: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, onLogout }) => (
  <header style={{ background: '#1976d2', color: 'white', padding: '16px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 2px 8px #0001' }}>
    <div style={{ fontWeight: 700, fontSize: 22, letterSpacing: 1 }}>DNA Testing Service</div>
    {user && (
      <div>
        Xin chào, <b>{user.fullName}</b> ({user.role})
        {onLogout && (
          <button onClick={onLogout} style={{ marginLeft: 16, padding: '6px 16px', borderRadius: 4, border: 'none', background: '#fff', color: '#1976d2', fontWeight: 600, cursor: 'pointer' }}>Đăng xuất</button>
        )}
      </div>
    )}
  </header>
);

export default Header; 