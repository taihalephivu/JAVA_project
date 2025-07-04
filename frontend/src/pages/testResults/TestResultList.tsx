import React, { useEffect, useState } from 'react';
import { getTestResults } from '../../api';
import { TestResult } from '../../types';

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

const TestResultList: React.FC = () => {
  const [results, setResults] = useState<TestResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const role = getUserRole();
  const isAdmin = role === 'ROLE_ADMIN';

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await getTestResults(isAdmin);
        setResults((res.data as any).content || res.data as TestResult[]);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Không thể tải kết quả xét nghiệm');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [isAdmin]);

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', background: '#fff', borderRadius: 12, boxShadow: '0 4px 24px #0001', padding: 0 }}>
      <div style={{ background: '#e3f0fd', borderTopLeftRadius: 12, borderTopRightRadius: 12, padding: '24px 32px 12px 32px', borderLeft: '6px solid #1976d2', boxShadow: '0 2px 12px #1976d211' }}>
        <h2 style={{ color: '#1976d2', marginBottom: 0, fontSize: 26, fontWeight: 700 }}>Danh sách kết quả xét nghiệm</h2>
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
        ) : results.length === 0 ? (
          <div>Không có kết quả xét nghiệm nào.</div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 24 }}>
            <thead>
              <tr style={{ background: '#f0f4fa' }}>
                <th style={{ padding: 10 }}>Mã mẫu</th>
                <th style={{ padding: 10 }}>Mã xét nghiệm</th>
                <th style={{ padding: 10 }}>Ngày xét nghiệm</th>
                <th style={{ padding: 10 }}>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {results.map(r => (
                <tr key={r.id}>
                  <td style={{ padding: 10 }}>{r.test?.sampleCode}</td>
                  <td style={{ padding: 10 }}>{r.test?.id}</td>
                  <td style={{ padding: 10 }}>{r.test?.createdAt?.slice(0, 10)}</td>
                  <td style={{ padding: 10 }}>
                    <a href={isAdmin ? `/admin/test-results/${r.id}` : `/test-results/${r.id}`} style={{ color: '#1976d2', fontWeight: 600 }}>Xem chi tiết</a>
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

export default TestResultList; 