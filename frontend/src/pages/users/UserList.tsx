import React from 'react';

const UserList: React.FC = () => (
  <div style={{ maxWidth: 800, margin: '0 auto', background: '#fff', borderRadius: 12, boxShadow: '0 4px 24px #0001', padding: 32 }}>
    <h2 style={{ color: '#1976d2', marginBottom: 16 }}>Danh sách người dùng</h2>
    <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 24 }}>
      <thead>
        <tr style={{ background: '#f0f4fa' }}>
          <th style={{ padding: 10 }}>ID</th>
          <th style={{ padding: 10 }}>Tên đăng nhập</th>
          <th style={{ padding: 10 }}>Họ tên</th>
          <th style={{ padding: 10 }}>Email</th>
          <th style={{ padding: 10 }}>Vai trò</th>
          <th style={{ padding: 10 }}>Thao tác</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style={{ padding: 10 }}>1</td>
          <td style={{ padding: 10 }}>admin</td>
          <td style={{ padding: 10 }}>Quản trị viên</td>
          <td style={{ padding: 10 }}>admin@email.com</td>
          <td style={{ padding: 10 }}>ROLE_ADMIN</td>
          <td style={{ padding: 10 }}><a href="/users/1" style={{ color: '#1976d2', fontWeight: 600 }}>Xem chi tiết</a></td>
        </tr>
        <tr>
          <td style={{ padding: 10 }}>2</td>
          <td style={{ padding: 10 }}>user1</td>
          <td style={{ padding: 10 }}>Nguyễn Văn A</td>
          <td style={{ padding: 10 }}>user1@email.com</td>
          <td style={{ padding: 10 }}>ROLE_CUSTOMER</td>
          <td style={{ padding: 10 }}><a href="/users/2" style={{ color: '#1976d2', fontWeight: 600 }}>Xem chi tiết</a></td>
        </tr>
      </tbody>
    </table>
  </div>
);

export default UserList; 