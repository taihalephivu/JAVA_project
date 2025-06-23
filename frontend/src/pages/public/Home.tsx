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

    <div style={{ borderTop: '1px solid #eee', paddingTop: 24, marginTop: 32 }}>
      <h2 style={{ color: '#1976d2', marginBottom: 16 }}>Bài viết & Tin tức mới nhất</h2>
      {/* TODO: Lấy dữ liệu bài viết thật */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div>
          <a href="/posts/1" style={{ fontSize: 18, fontWeight: 600, color: '#333', textDecoration: 'none' }}>Hiểu đúng về xét nghiệm ADN huyết thống</a>
          <p style={{ color: '#666', marginTop: 4 }}>Giải đáp các thắc mắc thường gặp về quy trình, độ chính xác và ý nghĩa của xét nghiệm ADN huyết thống...</p>
        </div>
        <div>
          <a href="/posts/2" style={{ fontSize: 18, fontWeight: 600, color: '#333', textDecoration: 'none' }}>Công nghệ giải trình tự gen thế hệ mới</a>
          <p style={{ color: '#666', marginTop: 4 }}>Tìm hiểu về công nghệ NGS và những đột phá mà nó mang lại trong lĩnh vực di truyền học...</p>
        </div>
      </div>
      <div style={{ textAlign: 'center', marginTop: 24 }}>
        <a href="/posts" style={{ color: '#1976d2', fontWeight: 600 }}>Xem tất cả bài viết &rarr;</a>
      </div>
    </div>

    <div style={{ marginTop: 32, textAlign: 'center' }}>
      <a href="/login" style={{ color: '#1976d2', fontWeight: 600, fontSize: 18, marginRight: 16 }}>Đăng nhập</a>
      <a href="/register" style={{ color: '#1976d2', fontWeight: 600, fontSize: 18 }}>Đăng ký</a>
    </div>
  </div>
);

export default Home; 