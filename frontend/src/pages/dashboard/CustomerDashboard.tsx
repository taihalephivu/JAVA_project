import React from 'react';

const CustomerDashboard: React.FC = () => (
  <div style={{ maxWidth: 700, margin: '0 auto', background: '#fff', borderRadius: 12, boxShadow: '0 4px 24px #0001', padding: 32 }}>
    <h2 style={{ color: '#1976d2', marginBottom: 16 }}>Dashboard Khách hàng</h2>
    <p>Chào mừng bạn đến với trang quản lý lịch hẹn và kết quả xét nghiệm ADN.</p>
    {/* Thêm các nút chuyển hướng đến lịch hẹn, xét nghiệm, kết quả, profile */}
  </div>
);

export default CustomerDashboard; 