import React, { useEffect, useState } from 'react';
import { getPackages } from '../../api';
import { TestPackage } from '../../types';
import { useNavigate } from 'react-router-dom';

const formatPrice = (price: number) => price.toLocaleString('vi-VN') + 'đ';

const Packages: React.FC = () => {
  const navigate = useNavigate();
  const user = React.useMemo(() => {
    try {
      const userStr = localStorage.getItem('user');
      if (userStr) return JSON.parse(userStr);
    } catch {}
    return null;
  }, []);
  const [packages, setPackages] = useState<TestPackage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getPackages();
        setPackages(data as TestPackage[]);
        setError(null);
      } catch {
        setError('Không thể tải danh sách gói xét nghiệm.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '32px 12px' }}>
      <div style={{ textAlign: 'center', marginBottom: 36 }}>
        <h1 style={{ color: '#1976d2', fontSize: 32, marginBottom: 12 }}>Các gói xét nghiệm ADN</h1>
        <p style={{ fontSize: 18, color: '#555', maxWidth: 700, margin: '0 auto' }}>
          Lựa chọn gói xét nghiệm phù hợp với nhu cầu của bạn. Chúng tôi cam kết kết quả chính xác, bảo mật tuyệt đối, quy trình nhanh chóng và hỗ trợ tận tâm.
        </p>
      </div>
      {loading ? (
        <div style={{ textAlign: 'center', color: '#1976d2', fontSize: 18 }}>Đang tải...</div>
      ) : error ? (
        <div style={{ textAlign: 'center', color: 'red', fontSize: 18 }}>{error}</div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))', gap: 28, marginBottom: 40 }}>
          {packages.map((pkg, idx) => (
            <div key={pkg.id || idx} style={{ background: '#fff', borderRadius: 16, boxShadow: '0 4px 24px #0001', padding: 28, display: 'flex', flexDirection: 'column', alignItems: 'center', transition: 'box-shadow 0.2s', border: '1px solid #f0f0f0' }}>
              <div style={{ fontSize: 48, marginBottom: 12 }}>{pkg.icon || '🧬'}</div>
              <h2 style={{ color: '#1976d2', fontSize: 22, margin: '8px 0 10px 0', textAlign: 'center' }}>{pkg.name}</h2>
              <div style={{ color: '#555', fontSize: 15, marginBottom: 14, textAlign: 'center', minHeight: 48 }}>{pkg.description}</div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, marginBottom: 18, width: '100%' }}>
                {pkg.features && pkg.features.map((f, i) => (
                  <li key={i} style={{ color: '#1976d2', fontWeight: 500, fontSize: 15, marginBottom: 4, display: 'flex', alignItems: 'center' }}>
                    <span style={{ fontSize: 16, marginRight: 6 }}>✔️</span> {f}
                  </li>
                ))}
              </ul>
              <div style={{ fontSize: 22, color: '#d32f2f', fontWeight: 700, marginBottom: 18 }}>{formatPrice(pkg.price)}</div>
              <button
                style={{
                  background: '#1976d2', color: '#fff', padding: '12px 0', borderRadius: 8,
                  fontWeight: 600, width: '100%', textAlign: 'center', fontSize: 16,
                  boxShadow: '0 2px 8px #1976d233', border: 'none', cursor: 'pointer'
                }}
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
      )}
      <div style={{ textAlign: 'center', marginTop: 32 }}>
        <h3 style={{ color: '#1976d2', fontSize: 20, marginBottom: 10 }}>Bạn cần tư vấn thêm?</h3>
        <a href="/contact" style={{ background: '#fff', color: '#1976d2', border: '2px solid #1976d2', padding: '12px 32px', borderRadius: 8, textDecoration: 'none', fontWeight: 600, fontSize: 17, transition: 'background 0.2s, color 0.2s' }}
          onMouseOver={e => { e.currentTarget.style.background = '#1976d2'; e.currentTarget.style.color = '#fff'; }}
          onMouseOut={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.color = '#1976d2'; }}
        >
          Liên hệ tư vấn miễn phí
        </a>
      </div>
    </div>
  );
};

export default Packages; 