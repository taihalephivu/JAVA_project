import React from 'react';

const AdminDashboard: React.FC = () => (
  <div style={{ maxWidth: 800, margin: '0 auto', background: '#fff', borderRadius: 12, boxShadow: '0 4px 24px #0001', padding: 32 }}>
    <h2 style={{ color: '#1976d2', marginBottom: 16 }}>Trang quản trị trung tâm</h2>
    <p>Chào mừng bạn đến với trang quản trị trung tâm xét nghiệm ADN. </p>
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, marginTop: 24 }}>
      <a href="/admin/appointments" style={{ background: '#1976d2', color: '#fff', padding: '14px 28px', borderRadius: 6, textDecoration: 'none', fontWeight: 600, minWidth: 180, textAlign: 'center' }}>Quản lý lịch hẹn</a>
      <a href="/admin/tests" style={{ background: '#1976d2', color: '#fff', padding: '14px 28px', borderRadius: 6, textDecoration: 'none', fontWeight: 600, minWidth: 180, textAlign: 'center' }}>Quản lý xét nghiệm</a>
      <a href="/admin/test-results" style={{ background: '#1976d2', color: '#fff', padding: '14px 28px', borderRadius: 6, textDecoration: 'none', fontWeight: 600, minWidth: 180, textAlign: 'center' }}>Quản lý kết quả</a>
      <a href="/users" style={{ background: '#1976d2', color: '#fff', padding: '14px 28px', borderRadius: 6, textDecoration: 'none', fontWeight: 600, minWidth: 180, textAlign: 'center' }}>Quản lý người dùng</a>
      <a href="/admin/posts" style={{ background: '#1976d2', color: '#fff', padding: '14px 28px', borderRadius: 6, textDecoration: 'none', fontWeight: 600, minWidth: 180, textAlign: 'center' }}>Quản lý bài viết</a>
      <a href="/admin/packages" style={{ background: '#1976d2', color: '#fff', padding: '14px 28px', borderRadius: 6, textDecoration: 'none', fontWeight: 600, minWidth: 180, textAlign: 'center' }}>Quản lý gói xét nghiệm</a>
    </div>
  </div>
);

export default AdminDashboard; 