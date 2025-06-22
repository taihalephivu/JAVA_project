import React from 'react';

const TestResultDetail: React.FC = () => (
  <div style={{ maxWidth: 600, margin: '0 auto', background: '#fff', borderRadius: 12, boxShadow: '0 4px 24px #0001', padding: 32 }}>
    <h2 style={{ color: '#1976d2', marginBottom: 16 }}>Chi tiết kết quả xét nghiệm</h2>
    <div style={{ fontSize: 16, marginBottom: 18 }}>
      <div><b>Mã kết quả:</b> R001</div>
      <div><b>Mã xét nghiệm:</b> T001</div>
      <div><b>Kết quả:</b> Quan hệ cha - con xác nhận</div>
      <div><b>Diễn giải:</b> Kết quả cho thấy mẫu ADN phù hợp...</div>
      <div><b>Khuyến nghị:</b> Liên hệ chuyên gia tư vấn nếu cần hỗ trợ thêm</div>
    </div>
    <a href="/test-results" style={{ color: '#1976d2', fontWeight: 600 }}>Quay lại danh sách</a>
  </div>
);

export default TestResultDetail; 