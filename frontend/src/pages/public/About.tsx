import React from 'react';

const About: React.FC = () => (
  <div style={{ maxWidth: 700, margin: '0 auto', background: '#fff', borderRadius: 12, boxShadow: '0 4px 24px #0001', padding: 32 }}>
    <h2 style={{ color: '#1976d2', marginBottom: 16 }}>Về chúng tôi</h2>
    <p style={{ fontSize: 17 }}>
      Trung tâm Xét nghiệm ADN là đơn vị hàng đầu trong lĩnh vực phân tích di truyền tại Việt Nam. Chúng tôi sở hữu đội ngũ chuyên gia giàu kinh nghiệm, hệ thống máy móc hiện đại, cam kết mang lại kết quả chính xác, bảo mật tuyệt đối cho khách hàng.
    </p>
    <ul style={{ marginTop: 18, fontSize: 16 }}>
      <li>Đội ngũ chuyên gia uy tín, tận tâm</li>
      <li>Trang thiết bị hiện đại, đạt chuẩn quốc tế</li>
      <li>Quy trình xét nghiệm nhanh chóng, bảo mật</li>
      <li>Hỗ trợ tư vấn miễn phí 24/7</li>
    </ul>
  </div>
);

export default About; 