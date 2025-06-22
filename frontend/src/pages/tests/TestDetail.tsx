import React from 'react';

const TestDetail: React.FC = () => (
  <div style={{ maxWidth: 600, margin: '0 auto', background: '#fff', borderRadius: 12, boxShadow: '0 4px 24px #0001', padding: 32 }}>
    <h2 style={{ color: '#1976d2', marginBottom: 16 }}>Chi tiết xét nghiệm</h2>
    <div style={{ fontSize: 16, marginBottom: 18 }}>
      <div><b>Mã xét nghiệm:</b> T001</div>
      <div><b>Mã mẫu:</b> S001</div>
      <div><b>Loại xét nghiệm:</b> Cha con</div>
      <div><b>Trạng thái:</b> Đang xử lý</div>
      <div><b>Tổng tiền:</b> 2.000.000đ</div>
      <div><b>Trạng thái thanh toán:</b> Chờ thanh toán</div>
    </div>
    <a href="/tests" style={{ color: '#1976d2', fontWeight: 600 }}>Quay lại danh sách</a>
  </div>
);

export default TestDetail; 