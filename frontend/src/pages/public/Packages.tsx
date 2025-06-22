import React from 'react';

const Packages: React.FC = () => (
  <div style={{ maxWidth: 700, margin: '0 auto', background: '#fff', borderRadius: 12, boxShadow: '0 4px 24px #0001', padding: 32 }}>
    <h2 style={{ color: '#1976d2', marginBottom: 16 }}>Các gói xét nghiệm</h2>
    <ul style={{ fontSize: 16, marginBottom: 24 }}>
      <li><b>Gói cha con</b>: Xác định quan hệ huyết thống cha - con. <span style={{ color: '#1976d2' }}>2.000.000đ</span></li>
      <li><b>Gói mẹ con</b>: Xác định quan hệ huyết thống mẹ - con. <span style={{ color: '#1976d2' }}>2.000.000đ</span></li>
      <li><b>Gói anh/chị/em</b>: Xác định quan hệ huyết thống anh/chị/em. <span style={{ color: '#1976d2' }}>2.500.000đ</span></li>
      <li><b>Gói pháp lý</b>: Kết quả có giá trị pháp lý. <span style={{ color: '#1976d2' }}>3.500.000đ</span></li>
    </ul>
    <a href="/login" style={{ background: '#1976d2', color: '#fff', padding: '12px 32px', borderRadius: 6, textDecoration: 'none', fontWeight: 600 }}>Đặt lịch ngay</a>
  </div>
);

export default Packages; 