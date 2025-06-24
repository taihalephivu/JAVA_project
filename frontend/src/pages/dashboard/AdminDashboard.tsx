import React from 'react';

const AdminDashboard: React.FC = () => (
  <div style={{ maxWidth: 700, margin: '0 auto', background: '#fff', borderRadius: 12, boxShadow: '0 4px 24px #0001', padding: 32 }}>
    <h2 style={{ color: '#1976d2', marginBottom: 16 }}>Dashboard Quản trị</h2>
    <p>Chào mừng bạn đến với trang quản lý trung tâm xét nghiệm ADN.</p>
    <div style={{ display: 'flex', gap: 16, marginTop: 24 }}>
      <a href="/admin/appointments" style={{ background: '#1976d2', color: '#fff', padding: '12px 24px', borderRadius: 6, textDecoration: 'none', fontWeight: 600 }}>Quản lý lịch hẹn</a>
      <a href="/admin/tests" style={{ background: '#1976d2', color: '#fff', padding: '12px 24px', borderRadius: 6, textDecoration: 'none', fontWeight: 600 }}>Quản lý xét nghiệm</a>
      <a href="/admin/test-results" style={{ background: '#1976d2', color: '#fff', padding: '12px 24px', borderRadius: 6, textDecoration: 'none', fontWeight: 600 }}>Quản lý kết quả</a>
      <a href="/users" style={{ background: '#1976d2', color: '#fff', padding: '12px 24px', borderRadius: 6, textDecoration: 'none', fontWeight: 600 }}>Quản lý người dùng</a>
    </div>
  </div>
);

export default AdminDashboard; 