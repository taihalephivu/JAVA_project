import React from 'react';

const UserDetail: React.FC = () => (
  <div style={{ maxWidth: 600, margin: '0 auto', background: '#fff', borderRadius: 12, boxShadow: '0 4px 24px #0001', padding: 32 }}>
    <h2 style={{ color: '#1976d2', marginBottom: 16 }}>Chi tiết người dùng</h2>
    <div style={{ fontSize: 16, marginBottom: 18 }}>
      <div><b>ID:</b> 1</div>
      <div><b>Tên đăng nhập:</b> admin</div>
      <div><b>Họ tên:</b> Quản trị viên</div>
      <div><b>Email:</b> admin@email.com</div>
      <div><b>Vai trò:</b> ROLE_ADMIN</div>
    </div>
    <a href="/users" style={{ color: '#1976d2', fontWeight: 600 }}>Quay lại danh sách</a>
  </div>
);

export default UserDetail; 