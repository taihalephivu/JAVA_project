import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getTestResult, updateTestResult, deleteTestResult } from '../../api';
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

const TestResultDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [result, setResult] = useState<TestResult | null>(null);
  const [form, setForm] = useState({ resultData: '', interpretation: '', recommendations: '' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const navigate = useNavigate();
  const role = getUserRole();
  const isAdmin = role === 'ROLE_ADMIN';

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await getTestResult(id!);
        setResult(res.data as TestResult);
        setForm({
          resultData: (res.data as TestResult).resultData || '',
          interpretation: (res.data as TestResult).interpretation || '',
          recommendations: (res.data as TestResult).recommendations || ''
        });
      } catch (err: any) {
        setError(err.response?.data?.message || 'Không thể tải chi tiết kết quả xét nghiệm');
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchData();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(null);
    try {
      await updateTestResult(id!, { ...form, test: result?.test });
      setSuccess('Cập nhật kết quả thành công!');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Cập nhật kết quả thất bại');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa kết quả này?')) return;
    setDeleting(true);
    setError(null);
    try {
      await deleteTestResult(id!);
      navigate('/test-results');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Xóa kết quả thất bại');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', background: '#fff', borderRadius: 12, boxShadow: '0 4px 24px #0001', padding: 32 }}>
      <h2 style={{ color: '#1976d2', marginBottom: 16 }}>Chi tiết kết quả xét nghiệm</h2>
      {loading ? (
        <div>Đang tải...</div>
      ) : error ? (
        <div style={{ color: 'red' }}>{error}</div>
      ) : result ? (
        isAdmin ? (
          <form onSubmit={handleSubmit} style={{ fontSize: 16, marginBottom: 18, display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div><b>Mã kết quả:</b> {result.id}</div>
            <div><b>Mã xét nghiệm:</b> {result.test?.id}</div>
            <textarea name="resultData" placeholder="Kết quả" value={form.resultData} onChange={handleChange} required style={{ padding: 10, borderRadius: 6, border: '1px solid #bbb', minHeight: 60 }} />
            <textarea name="interpretation" placeholder="Diễn giải" value={form.interpretation} onChange={handleChange} style={{ padding: 10, borderRadius: 6, border: '1px solid #bbb', minHeight: 60 }} />
            <textarea name="recommendations" placeholder="Khuyến nghị" value={form.recommendations} onChange={handleChange} style={{ padding: 10, borderRadius: 6, border: '1px solid #bbb', minHeight: 60 }} />
            <div style={{ display: 'flex', gap: 12 }}>
              <button type="submit" disabled={saving} style={{ background: '#1976d2', color: '#fff', padding: '10px 24px', borderRadius: 6, fontWeight: 600, fontSize: 16, border: 'none', cursor: 'pointer' }}>{saving ? 'Đang lưu...' : 'Lưu thay đổi'}</button>
              <button type="button" onClick={handleDelete} disabled={deleting} style={{ background: '#d32f2f', color: '#fff', padding: '10px 24px', borderRadius: 6, fontWeight: 600, fontSize: 16, border: 'none', cursor: 'pointer' }}>{deleting ? 'Đang xóa...' : 'Xóa kết quả'}</button>
            </div>
            {success && <div style={{ color: 'green', textAlign: 'center' }}>{success}</div>}
            {error && <div style={{ color: 'red', textAlign: 'center' }}>{error}</div>}
          </form>
        ) : (
          <div style={{ fontSize: 16, marginBottom: 18 }}>
            <div><b>Mã kết quả:</b> {result.id}</div>
            <div><b>Mã xét nghiệm:</b> {result.test?.id}</div>
            <div><b>Kết quả:</b> {result.resultData}</div>
            <div><b>Diễn giải:</b> {result.interpretation}</div>
            <div><b>Khuyến nghị:</b> {result.recommendations}</div>
          </div>
        )
      ) : (
        <div>Không tìm thấy kết quả xét nghiệm.</div>
      )}
      <a href="/test-results" style={{ color: '#1976d2', fontWeight: 600 }}>Quay lại danh sách</a>
    </div>
  );
};

export default TestResultDetail; 