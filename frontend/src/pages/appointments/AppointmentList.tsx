import React from 'react';

const AppointmentList: React.FC = () => (
  <div style={{ maxWidth: 800, margin: '0 auto', background: '#fff', borderRadius: 12, boxShadow: '0 4px 24px #0001', padding: 32 }}>
    <h2 style={{ color: '#1976d2', marginBottom: 16 }}>Danh sách lịch hẹn</h2>
    <a href="/appointments/new" style={{ background: '#1976d2', color: '#fff', padding: '10px 20px', borderRadius: 6, textDecoration: 'none', fontWeight: 600, float: 'right', marginBottom: 16 }}>Đặt lịch mới</a>
    <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 24 }}>
      <thead>
        <tr style={{ background: '#f0f4fa' }}>
          <th style={{ padding: 10 }}>Mã lịch hẹn</th>
          <th style={{ padding: 10 }}>Ngày hẹn</th>
          <th style={{ padding: 10 }}>Trạng thái</th>
          <th style={{ padding: 10 }}>Thao tác</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style={{ padding: 10 }}>A001</td>
          <td style={{ padding: 10 }}>2024-07-01</td>
          <td style={{ padding: 10 }}>Đã xác nhận</td>
          <td style={{ padding: 10 }}><a href="/appointments/1" style={{ color: '#1976d2', fontWeight: 600 }}>Xem chi tiết</a></td>
        </tr>
        <tr>
          <td style={{ padding: 10 }}>A002</td>
          <td style={{ padding: 10 }}>2024-07-05</td>
          <td style={{ padding: 10 }}>Chờ xác nhận</td>
          <td style={{ padding: 10 }}><a href="/appointments/2" style={{ color: '#1976d2', fontWeight: 600 }}>Xem chi tiết</a></td>
        </tr>
      </tbody>
    </table>
  </div>
);

export default AppointmentList; 