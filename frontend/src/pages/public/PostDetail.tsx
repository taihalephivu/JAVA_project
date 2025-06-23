import React from 'react';
import { useParams } from 'react-router-dom';

const PostDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: 32 }}>
      <div style={{ background: '#fff', padding: 32, borderRadius: 12, boxShadow: '0 4px 24px #0001' }}>
        <h1 style={{ color: '#1976d2', marginBottom: 16 }}>Chi tiết bài viết #{id}</h1>
        <p style={{ color: '#777', marginBottom: 24 }}>Ngày đăng: 01/01/2024</p>
        <div style={{ lineHeight: 1.8 }}>
          <p>Đây là nội dung chi tiết của bài viết. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi.</p>
          <p>Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat. Duis semper. Duis arcu massa, scelerisque vitae, consequat in, pretium a, enim. Pellentesque congue. Ut in risus volutpat libero pharetra tempor. Cras vestibulum bibendum augue. Praesent egestas leo in pede. Praesent blandit odio eu enim. Pellentesque sed dui ut augue blandit sodales. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aliquam nibh.</p>
        </div>
        <a href="/posts" style={{ color: '#1976d2', fontWeight: 600, marginTop: 24, display: 'inline-block' }}>
          &larr; Quay lại danh sách bài viết
        </a>
      </div>
    </div>
  );
};

export default PostDetail; 