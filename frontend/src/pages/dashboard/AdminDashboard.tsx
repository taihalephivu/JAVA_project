import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

const adminMenus = [
  { label: 'Quản lý lịch hẹn', href: '/admin/appointments', icon: '📅' },
  { label: 'Quản lý xét nghiệm', href: '/admin/tests', icon: '🧪' },
  { label: 'Quản lý kết quả', href: '/admin/test-results', icon: '📄' },
  { label: 'Quản lý người dùng', href: '/admin/users', icon: '👤' },
  { label: 'Quản lý bài viết', href: '/admin/posts', icon: '📰' },
  { label: 'Quản lý gói xét nghiệm', href: '/admin/packages', icon: '📦' },
  { label: 'Quản lý nhận xét', href: '/admin/reviews', icon: '⭐' },
];

const AdminDashboard: React.FC = () => {
  const location = useLocation();
  return (
    <div style={{ display: 'flex', minHeight: '80vh', background: 'none' }}>
      {/* Sidebar */}
      <aside style={{
        width: 240,
        background: '#f6fafd',
        borderRight: '1px solid #e3e3e3',
        padding: '32px 0 0 0',
        minHeight: '100vh',
        position: 'sticky',
        top: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: 0,
      }}>
        <div style={{ fontWeight: 800, fontSize: 22, color: '#1976d2', textAlign: 'center', marginBottom: 32, letterSpacing: 1 }}>Admin Panel</div>
        {adminMenus.map(menu => (
          <Link
            key={menu.href}
            to={menu.href}
            style={{
              display: 'flex', alignItems: 'center', gap: 12,
              padding: '14px 32px',
              color: location.pathname.startsWith(menu.href) ? '#fff' : '#1976d2',
              background: location.pathname.startsWith(menu.href) ? '#1976d2' : 'none',
              fontWeight: 600,
              fontSize: 16,
              textDecoration: 'none',
              borderLeft: location.pathname.startsWith(menu.href) ? '4px solid #1565c0' : '4px solid transparent',
              transition: 'background 0.18s, color 0.18s',
              marginBottom: 2,
              borderRadius: '0 24px 24px 0',
            }}
          >
            <span style={{ fontSize: 20 }}>{menu.icon}</span>
            {menu.label}
          </Link>
        ))}
      </aside>
      {/* Main content */}
      <main style={{ flex: 1, padding: '40px 32px', background: '#fff', minHeight: '100vh' }}>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminDashboard; 