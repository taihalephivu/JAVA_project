import React from 'react';

const AppointmentDetail: React.FC = () => (
  <div style={{ maxWidth: 600, margin: '0 auto', background: '#fff', borderRadius: 12, boxShadow: '0 4px 24px #0001', padding: 32 }}>
    <h2 style={{ color: '#1976d2', marginBottom: 16 }}>Chi tiết lịch hẹn</h2>
    <div style={{ fontSize: 16, marginBottom: 18 }}>
      <div><b>Mã lịch hẹn:</b> A001</div>
      <div><b>Ngày hẹn:</b> 2024-07-01</div>
      <div><b>Loại xét nghiệm:</b> Cha con</div>
      <div><b>Trạng thái:</b> Đã xác nhận</div>
      <div><b>Ghi chú:</b> Mang theo giấy tờ tùy thân</div>
    </div>
    <a href="/appointments" style={{ color: '#1976d2', fontWeight: 600 }}>Quay lại danh sách</a>
  </div>
);

export default AppointmentDetail; 