import React, { useEffect, useState } from 'react';
import { getTests } from '../../api';
import { Test } from '../../types';

function getUserRole(): string | null {
  try {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      const user = JSON.parse(userStr);
      return user.role || null;
    }
    const token = localStorage.getItem('token');
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.role || null;
    }
  } catch {
    return null;
  }
  return null;
}

const TestList: React.FC = () => {
  const [tests, setTests] = useState<Test[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const role = getUserRole();
  const isAdmin = role === 'ROLE_ADMIN';

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await getTests(isAdmin);
        setTests((res.data as any).content || res.data as Test[]);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Không thể tải danh sách xét nghiệm');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [isAdmin]);

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', background: '#fff', borderRadius: 12, boxShadow: '0 4px 24px #0001', padding: 0, position: 'relative' }}>
      <div style={{ background: '#e3f0fd', borderTopLeftRadius: 12, borderTopRightRadius: 12, padding: '24px 32px 12px 32px', borderLeft: '6px solid #1976d2', boxShadow: '0 2px 12px #1976d211' }}>
        <h2 style={{ color: '#1976d2', marginBottom: 0, fontSize: 26, fontWeight: 700 }}>Danh sách xét nghiệm</h2>
      </div>
      <div style={{ padding: 32 }}>
        <button
          onClick={() => window.history.back()}
          style={{ position: 'absolute', left: 24, top: 24, background: 'none', color: '#1976d2', border: 'none', fontWeight: 600, fontSize: 15, cursor: 'pointer', zIndex: 10, padding: 0, transition: 'color 0.18s', textDecoration: 'underline' }}
          onMouseOver={e => { e.currentTarget.style.color = '#0d47a1'; }}
          onMouseOut={e => { e.currentTarget.style.color = '#1976d2'; }}
        >Trở về</button>
        {loading ? (
          <div>Đang tải...</div>
        ) : error ? (
          <div style={{ color: 'red' }}>{error}</div>
        ) : tests.length === 0 ? (
          <div>Không có xét nghiệm nào.</div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 24 }}>
            <thead>
              <tr style={{ background: '#f0f4fa' }}>
                <th style={{ padding: 10 }}>Mã xét nghiệm</th>
                <th style={{ padding: 10 }}>Mã mẫu</th>
                <th style={{ padding: 10 }}>Trạng thái</th>
                <th style={{ padding: 10 }}>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {tests.map(t => (
                <tr key={t.id}>
                  <td style={{ padding: 10 }}>{t.id}</td>
                  <td style={{ padding: 10 }}>{t.sampleCode}</td>
                  <td style={{ padding: 10 }}>
                    <span style={{
                      display: 'inline-block',
                      fontWeight: 600,
                      borderRadius: 6,
                      padding: '4px 12px',
                      color: '#fff',
                      background: t.status === 'PENDING' ? '#1976d2'
                        : t.status === 'SAMPLE_COLLECTED' ? '#0288d1'
                        : t.status === 'IN_PROGRESS' ? '#ff9800'
                        : t.status === 'COMPLETED' ? '#4caf50'
                        : t.status === 'CANCELLED' ? '#d32f2f'
                        : t.status === 'FAILED' ? '#757575'
                        : '#888',
                      fontSize: 14
                    }}>{t.status === 'PENDING' ? 'Chờ xử lý'
                      : t.status === 'SAMPLE_COLLECTED' ? 'Đã thu mẫu'
                      : t.status === 'IN_PROGRESS' ? 'Đang xử lý'
                      : t.status === 'COMPLETED' ? 'Hoàn thành'
                      : t.status === 'CANCELLED' ? 'Đã hủy'
                      : t.status === 'FAILED' ? 'Thất bại'
                      : t.status}
                    </span>
                  </td>
                  <td style={{ padding: 10 }}>
                    <a href={isAdmin ? `/admin/tests/${t.id}` : `/tests/${t.id}`} style={{ color: '#1976d2', fontWeight: 600 }}>Xem chi tiết</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default TestList; 