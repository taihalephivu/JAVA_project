import React, { useEffect, useState } from 'react';
import { getPosts } from '../../api';
import { Post, Page, User } from '../../types';

function getCurrentUser(): User | null {
  try {
    const userStr = localStorage.getItem('user');
    if (userStr) return JSON.parse(userStr);
  } catch {}
  return null;
}

const Home: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const user = getCurrentUser();
  const isAdmin = user && user.role === 'ROLE_ADMIN';

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await getPosts(0, 5); // Lấy 5 bài mới nhất
        setPosts((res.data as Page<Post>).content || []);
      } catch {
        setError('Không thể tải bài viết.');
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  return (
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
        {error && <div style={{ color: 'red' }}>{error}</div>}
        {loading ? <div>Đang tải...</div> : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {posts.length === 0 ? <div>Chưa có bài viết nào.</div> : posts.map(post => (
              <div key={post.id}>
                <a href={`/posts/${post.id}`} style={{ fontSize: 18, fontWeight: 600, color: '#333', textDecoration: 'none' }}>{post.title}</a>
                <p style={{ color: '#666', marginTop: 4 }}>{post.content.slice(0, 120)}...</p>
              </div>
            ))}
          </div>
        )}
        <div style={{ textAlign: 'center', marginTop: 24 }}>
          <a href="/posts" style={{ color: '#1976d2', fontWeight: 600 }}>Xem tất cả bài viết &rarr;</a>
        </div>
      </div>

      { !user && (
        <div style={{ marginTop: 32, textAlign: 'center' }}>
          <a href="/login" style={{ color: '#1976d2', fontWeight: 600, fontSize: 18, marginRight: 16 }}>Đăng nhập</a>
          <a href="/register" style={{ color: '#1976d2', fontWeight: 600, fontSize: 18 }}>Đăng ký</a>
        </div>
      )}
    </div>
  );
};

export default Home; 