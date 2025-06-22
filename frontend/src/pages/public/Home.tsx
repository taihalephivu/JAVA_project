import React from 'react';

const Home: React.FC = () => (
  <div style={{ maxWidth: 800, margin: '0 auto', background: '#fff', borderRadius: 12, boxShadow: '0 4px 24px #0001', padding: 32 }}>
    <h1 style={{ color: '#1976d2', marginBottom: 16 }}>Chào mừng đến với Trung tâm Xét nghiệm ADN</h1>
    <p style={{ fontSize: 18, marginBottom: 24 }}>
      Trung tâm xét nghiệm ADN uy tín, hiện đại, bảo mật tuyệt đối. Chúng tôi cung cấp các gói xét nghiệm đa dạng, kết quả nhanh chóng, chính xác.
    </p>
    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 24 }}>
      <a href="/packages" style={{ background: '#1976d2', color: '#fff', padding: '12px 24px', borderRadius: 6, textDecoration: 'none', fontWeight: 600 }}>Xem các gói xét nghiệm</a>
      <a href="/about" style={{ background: '#fff', color: '#1976d2', border: '1px solid #1976d2', padding: '12px 24px', borderRadius: 6, textDecoration: 'none', fontWeight: 600 }}>Giới thiệu</a>
      <a href="/contact" style={{ background: '#fff', color: '#1976d2', border: '1px solid #1976d2', padding: '12px 24px', borderRadius: 6, textDecoration: 'none', fontWeight: 600 }}>Liên hệ</a>
    </div>
    <div style={{ marginTop: 32, textAlign: 'center' }}>
      <a href="/login" style={{ color: '#1976d2', fontWeight: 600, fontSize: 18, marginRight: 16 }}>Đăng nhập</a>
      <a href="/register" style={{ color: '#1976d2', fontWeight: 600, fontSize: 18 }}>Đăng ký</a>
    </div>
  </div>
);

export default Home; 