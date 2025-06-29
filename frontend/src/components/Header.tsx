import React from 'react';
import { User } from '../types';
import NotificationBell from './NotificationBell';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  user: User | null;
  onLogout?: () => void;
}

const SearchBar: React.FC = () => {
  const [q, setQ] = React.useState('');
  const navigate = useNavigate();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (q.trim()) navigate(`/search?q=${encodeURIComponent(q)}`);
  };
  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', alignItems: 'center', background: '#f3f6fa', borderRadius: 18, padding: '4px 16px', minWidth: 240, maxWidth: 340, flex: 1, margin: '0 32px', boxShadow: '0 1px 4px #0001' }}>
      <input
        type="text"
        placeholder="Tìm kiếm..."
        value={q}
        onChange={e => setQ(e.target.value)}
        style={{ border: 'none', background: 'transparent', outline: 'none', fontSize: 15, flex: 1, color: '#222' }}
      />
      <button type="submit" style={{ background: 'none', border: 'none', color: '#1976d2', fontSize: 20, cursor: 'pointer', padding: 0 }}>🔍</button>
    </form>
  );
};

const navLinkStyle: React.CSSProperties = {
  color: '#1976d2',
  textDecoration: 'none',
  padding: '7px 18px',
  borderRadius: 8,
  fontWeight: 500,
  transition: 'background 0.18s, color 0.18s',
  fontSize: 16,
  display: 'inline-block',
};

const navLinkHoverStyle: React.CSSProperties = {
  background: '#e3f0fd',
  color: '#0d47a1',
};

const Header: React.FC<HeaderProps> = ({ user, onLogout }) => {
  const navigate = useNavigate();
  // For hover effect
  const [hoverIdx, setHoverIdx] = React.useState<number | null>(null);
  const navs = [
    { label: 'Trang chủ', href: '/' },
    { label: 'Gói xét nghiệm', href: '/packages' },
    { label: 'Bài viết', href: '/posts' },
    { label: 'Giới thiệu', href: '/about' },
    { label: 'Liên hệ', href: '/contact' },
  ];
  if (user) navs.push({ label: 'Dashboard', href: '/dashboard' });

  // Xác định role
  const getRole = () => {
    if (!user) return null;
    if (user.role === 'ROLE_ADMIN') return 'admin';
    if (user.role === 'ROLE_CUSTOMER') return 'customer';
    return null;
  };
  const role = getRole();

  const handleBookClick = () => {
    if (!user) navigate('/login');
    else if (role === 'admin') navigate('/admin/appointments/new');
    else if (role === 'customer') navigate('/appointments/new');
    else navigate('/');
  };

  return (
    <header style={{ background: '#f6fafd', boxShadow: '0 2px 12px #0001', borderBottom: '2px solid #e3e3e3', marginBottom: 0 }}>
      {/* TopBar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 36px 8px 36px', background: '#fff', borderBottom: '2px solid #e3e3e3', boxShadow: '0 2px 8px #0001', zIndex: 2 }}>
        {/* Logo */}
        <div style={{ fontWeight: 800, fontSize: 24, letterSpacing: 1, color: '#1976d2', cursor: 'pointer', userSelect: 'none', textShadow: '0 2px 8px #1976d211' }} onClick={() => navigate('/')}>DNA Center</div>
        {/* SearchBar */}
        <SearchBar />
        {/* Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {/* Đặt lịch */}
          <button
            onClick={handleBookClick}
            title="Đặt lịch xét nghiệm"
            style={{ background: '#e3f0fd', color: '#1976d2', border: 'none', borderRadius: '50%', width: 42, height: 42, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, marginRight: 6, cursor: 'pointer', boxShadow: '0 2px 8px #1976d211', transition: 'background 0.18s, color 0.18s' }}
            onMouseOver={e => { e.currentTarget.style.background = '#1976d2'; e.currentTarget.style.color = '#fff'; }}
            onMouseOut={e => { e.currentTarget.style.background = '#e3f0fd'; e.currentTarget.style.color = '#1976d2'; }}
          >
            <span role="img" aria-label="calendar">📅</span>
          </button>
          {/* Login/Logout */}
          {user ? (
            <button onClick={onLogout} style={{ color: '#fff', background: '#1976d2', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 16, marginRight: 6, borderRadius: 8, padding: '7px 18px', boxShadow: '0 2px 8px #1976d211', transition: 'background 0.18s' }}
              onMouseOver={e => (e.currentTarget.style.background = '#0d47a1')}
              onMouseOut={e => (e.currentTarget.style.background = '#1976d2')}
            >Đăng xuất</button>
          ) : (
            <button onClick={() => navigate('/login')} style={{ color: '#1976d2', background: '#e3f0fd', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 16, marginRight: 6, borderRadius: 8, padding: '7px 18px', boxShadow: '0 2px 8px #1976d211', transition: 'background 0.18s' }}
              onMouseOver={e => { e.currentTarget.style.background = '#1976d2'; e.currentTarget.style.color = '#fff'; }}
              onMouseOut={e => { e.currentTarget.style.background = '#e3f0fd'; e.currentTarget.style.color = '#1976d2'; }}
            >Đăng nhập</button>
          )}
          {/* Notification */}
          <NotificationBell />
        </div>
      </div>
      {/* NavBar */}
      <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0, background: '#e3f0fd', borderTop: '2px solid #b3d1f7', boxShadow: '0 2px 8px #1976d211', fontSize: 16, fontWeight: 500, minHeight: 44 }}>
        {navs.map((nav, idx) => (
          <a
            key={nav.href}
            href={nav.href}
            style={{ ...navLinkStyle, ...(hoverIdx === idx ? navLinkHoverStyle : {}), borderRight: idx < navs.length - 1 ? '1px solid #d0e3fa' : 'none' }}
            onMouseEnter={() => setHoverIdx(idx)}
            onMouseLeave={() => setHoverIdx(null)}
          >
            {nav.label}
          </a>
        ))}
      </nav>
    </header>
  );
};

export default Header; 