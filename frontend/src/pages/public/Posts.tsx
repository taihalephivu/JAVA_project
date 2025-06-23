import React from 'react';

const Posts: React.FC = () => {
  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: 32 }}>
      <h2 style={{ color: '#1976d2', marginBottom: 24 }}>Bài viết & Tin tức</h2>
      {/* TODO: Fetch và render danh sách bài viết ở đây */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div style={{ background: '#fff', padding: 24, borderRadius: 12, boxShadow: '0 4px 24px #0001' }}>
          <h3>Tiêu đề bài viết mẫu 1</h3>
          <p>Đây là mô tả ngắn cho bài viết mẫu. Nội dung này sẽ được thay thế bằng dữ liệu thật từ API...</p>
          <a href="/posts/1" style={{ color: '#1976d2', fontWeight: 600 }}>Xem chi tiết</a>
        </div>
        <div style={{ background: '#fff', padding: 24, borderRadius: 12, boxShadow: '0 4px 24px #0001' }}>
          <h3>Tiêu đề bài viết mẫu 2</h3>
          <p>Đây là mô tả ngắn cho bài viết mẫu. Nội dung này sẽ được thay thế bằng dữ liệu thật từ API...</p>
          <a href="/posts/2" style={{ color: '#1976d2', fontWeight: 600 }}>Xem chi tiết</a>
        </div>
      </div>
    </div>
  );
};

export default Posts; 