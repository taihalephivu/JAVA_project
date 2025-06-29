import React, { useEffect, useState } from 'react';
import { getPosts, getPackages } from '../../api';
import { Post, Page, User, TestPackage } from '../../types';
import { useNavigate } from 'react-router-dom';

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

  // State cho packages
  const [packages, setPackages] = useState<TestPackage[]>([]);
  const [loadingPackages, setLoadingPackages] = useState(true);
  const [errorPackages, setErrorPackages] = useState<string | null>(null);
  const navigate = useNavigate();

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

  useEffect(() => {
    const fetchPackages = async () => {
      setLoadingPackages(true);
      setErrorPackages(null);
      try {
        const data = await getPackages();
        setPackages(data as TestPackage[]);
      } catch {
        setErrorPackages('Không thể tải danh sách gói xét nghiệm.');
      } finally {
        setLoadingPackages(false);
      }
    };
    fetchPackages();
  }, []);

  const formatPrice = (price: number) => price.toLocaleString('vi-VN') + 'đ';

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

      {/* Section các gói xét nghiệm */}
      <div style={{ borderTop: '1px solid #e3e3e3', paddingTop: 24, marginTop: 8, marginBottom: 32 }}>
        <h2 style={{ color: '#1976d2', marginBottom: 16, textAlign: 'center' }}>Các gói xét nghiệm nổi bật</h2>
        {errorPackages && <div style={{ color: 'red' }}>{errorPackages}</div>}
        {loadingPackages ? <div>Đang tải...</div> : (
          <div style={{
            width: '100%',
            overflow: 'hidden',
            position: 'relative',
            height: 240,
            background: 'none',
            margin: '0 auto',
          }}>
            <div
              style={{
                display: 'flex',
                gap: 18,
                alignItems: 'center',
                animation: packages.length > 0 ? 'marquee-scroll 18s linear infinite' : undefined,
                width: packages.length > 0 ? `${packages.length * 240 * 2}px` : '100%',
              }}
              // @ts-ignore: inline keyframes
              className="marquee-scroll"
            >
              {packages.length === 0 ? <div>Chưa có gói xét nghiệm nào.</div> :
                [...packages, ...packages].map((pkg, idx) => (
                  <div key={pkg.id + '-' + idx} style={{ background: '#fafdff', borderRadius: 14, boxShadow: '0 2px 12px #1976d211', padding: 20, textAlign: 'center', border: '1px solid #e3e3e3', minWidth: 200, maxWidth: 220, flex: '0 0 220px', display: 'flex', flexDirection: 'column', alignItems: 'center', transition: 'box-shadow 0.18s', margin: '8px 0' }}>
                    <div style={{ fontSize: 38, marginBottom: 8 }}>{pkg.icon || '🧬'}</div>
                    <div style={{ fontWeight: 700, fontSize: 18, color: '#1976d2', marginBottom: 6 }}>{pkg.name}</div>
                    <div style={{ color: '#555', fontSize: 15, marginBottom: 10, minHeight: 36 }}>{pkg.description}</div>
                    <div style={{ fontSize: 17, color: '#d32f2f', fontWeight: 700, marginBottom: 12 }}>{formatPrice(pkg.price)}</div>
                    <button
                      style={{ background: '#1976d2', color: '#fff', padding: '8px 0', borderRadius: 8, fontWeight: 600, width: '100%', textAlign: 'center', fontSize: 15, border: 'none', cursor: 'pointer', marginTop: 'auto' }}
                      onClick={() => {
                        if (user) navigate('/appointments/new', { state: { testTypeName: pkg.name } });
                        else navigate('/login');
                      }}
                      onMouseOver={e => (e.currentTarget.style.background = '#1565c0')}
                      onMouseOut={e => (e.currentTarget.style.background = '#1976d2')}
                    >
                      Đặt lịch ngay
                    </button>
                  </div>
                ))}
            </div>
            <style>{`
              @keyframes marquee-scroll {
                0% { transform: translateX(0); }
                100% { transform: translateX(-50%); }
              }
            `}</style>
          </div>
        )}
        <div style={{ textAlign: 'center', marginTop: 18 }}>
          <a href="/packages" style={{ color: '#1976d2', fontWeight: 600, fontSize: 15 }}>Xem tất cả gói xét nghiệm &rarr;</a>
        </div>
      </div>

      {/* Section bài viết & tin tức */}
      <div style={{ borderTop: '1px solid #eee', paddingTop: 24, marginTop: 32 }}>
        <h2 style={{ color: '#1976d2', marginBottom: 16 }}>Bài viết & Tin tức mới nhất</h2>
        {error && <div style={{ color: 'red' }}>{error}</div>}
        {loading ? <div>Đang tải...</div> : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 22,
            marginTop: 8,
          }}>
            {posts.length === 0 ? <div>Chưa có bài viết nào.</div> : posts.map(post => (
              <div
                key={post.id}
                style={{
                  background: '#fff',
                  borderRadius: 14,
                  boxShadow: '0 2px 12px #0001',
                  padding: 22,
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'box-shadow 0.18s, transform 0.18s',
                  cursor: 'pointer',
                  border: '1px solid #e3e3e3',
                }}
                onMouseOver={e => {
                  e.currentTarget.style.boxShadow = '0 6px 24px #1976d233';
                  e.currentTarget.style.transform = 'translateY(-4px) scale(1.025)';
                }}
                onMouseOut={e => {
                  e.currentTarget.style.boxShadow = '0 2px 12px #0001';
                  e.currentTarget.style.transform = 'none';
                }}
                onClick={() => window.location.href = `/posts/${post.id}`}
              >
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
                  <div style={{ fontSize: 32, marginRight: 12 }}>📰</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: 19, color: '#1976d2', marginBottom: 2 }}>{post.title}</div>
                    <div style={{ color: '#888', fontSize: 13 }}>
                      {post.author?.fullName || 'Ẩn danh'} &bull; {new Date(post.createdAt).toLocaleDateString('vi-VN')}
                    </div>
                  </div>
                </div>
                <div style={{ color: '#555', fontSize: 15, marginBottom: 12, minHeight: 38 }}>{post.content.slice(0, 120)}...</div>
                <div style={{ textAlign: 'right', marginTop: 'auto' }}>
                  <a
                    href={`/posts/${post.id}`}
                    style={{
                      color: '#fff',
                      background: '#1976d2',
                      borderRadius: 8,
                      padding: '7px 18px',
                      fontWeight: 600,
                      fontSize: 15,
                      textDecoration: 'none',
                      boxShadow: '0 2px 8px #1976d211',
                      transition: 'background 0.18s',
                    }}
                    onMouseOver={e => (e.currentTarget.style.background = '#0d47a1')}
                    onMouseOut={e => (e.currentTarget.style.background = '#1976d2')}
                  >
                    Xem chi tiết
                  </a>
                </div>
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