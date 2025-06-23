import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getTest, updateTest, deleteTest } from '../../api';
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

const TestDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [test, setTest] = useState<Test | null>(null);
  const [form, setForm] = useState({ sampleCode: '', testTypeName: '', status: '', totalAmount: '', paymentStatus: '' });
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
        const res = await getTest(id!);
        setTest(res.data as Test);
        setForm({
          sampleCode: (res.data as Test).sampleCode || '',
          testTypeName: (res.data as Test).testTypeName || '',
          status: (res.data as Test).status || '',
          totalAmount: (res.data as Test).totalAmount?.toString() || '',
          paymentStatus: (res.data as Test).paymentStatus || ''
        });
      } catch (err: any) {
        setError(err.response?.data?.message || 'Không thể tải chi tiết xét nghiệm');
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchData();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(null);
    try {
      await updateTest(id!, { ...form, totalAmount: Number(form.totalAmount) });
      setSuccess('Cập nhật xét nghiệm thành công!');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Cập nhật xét nghiệm thất bại');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa xét nghiệm này?')) return;
    setDeleting(true);
    setError(null);
    try {
      await deleteTest(id!);
      navigate('/tests');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Xóa xét nghiệm thất bại');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', background: '#fff', borderRadius: 12, boxShadow: '0 4px 24px #0001', padding: 32 }}>
      <h2 style={{ color: '#1976d2', marginBottom: 16 }}>Chi tiết xét nghiệm</h2>
      {loading ? (
        <div>Đang tải...</div>
      ) : error ? (
        <div style={{ color: 'red' }}>{error}</div>
      ) : test ? (
        isAdmin ? (
          <form onSubmit={handleSubmit} style={{ fontSize: 16, marginBottom: 18, display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div><b>Mã xét nghiệm:</b> {test.id}</div>
            <input name="sampleCode" placeholder="Mã mẫu" value={form.sampleCode} onChange={handleChange} required style={{ padding: 10, borderRadius: 6, border: '1px solid #bbb' }} />
            <input name="testTypeName" placeholder="Loại xét nghiệm" value={form.testTypeName} onChange={handleChange} required style={{ padding: 10, borderRadius: 6, border: '1px solid #bbb' }} />
            <select name="status" value={form.status} onChange={handleChange} required style={{ padding: 10, borderRadius: 6, border: '1px solid #bbb' }}>
              <option value="">Chọn trạng thái</option>
              <option value="PENDING">Chờ xử lý</option>
              <option value="PROCESSING">Đang xử lý</option>
              <option value="COMPLETED">Hoàn thành</option>
              <option value="CANCELLED">Đã hủy</option>
            </select>
            <input name="totalAmount" placeholder="Tổng tiền" value={form.totalAmount} onChange={handleChange} required style={{ padding: 10, borderRadius: 6, border: '1px solid #bbb' }} />
            <select name="paymentStatus" value={form.paymentStatus} onChange={handleChange} required style={{ padding: 10, borderRadius: 6, border: '1px solid #bbb' }}>
              <option value="">Chọn trạng thái thanh toán</option>
              <option value="UNPAID">Chờ thanh toán</option>
              <option value="PAID">Đã thanh toán</option>
              <option value="REFUNDED">Đã hoàn tiền</option>
            </select>
            <div style={{ display: 'flex', gap: 12 }}>
              <button type="submit" disabled={saving} style={{ background: '#1976d2', color: '#fff', padding: '10px 24px', borderRadius: 6, fontWeight: 600, fontSize: 16, border: 'none', cursor: 'pointer' }}>{saving ? 'Đang lưu...' : 'Lưu thay đổi'}</button>
              <button type="button" onClick={handleDelete} disabled={deleting} style={{ background: '#d32f2f', color: '#fff', padding: '10px 24px', borderRadius: 6, fontWeight: 600, fontSize: 16, border: 'none', cursor: 'pointer' }}>{deleting ? 'Đang xóa...' : 'Xóa xét nghiệm'}</button>
            </div>
            {success && <div style={{ color: 'green', textAlign: 'center' }}>{success}</div>}
            {error && <div style={{ color: 'red', textAlign: 'center' }}>{error}</div>}
          </form>
        ) : (
          <div style={{ fontSize: 16, marginBottom: 18 }}>
            <div><b>Mã xét nghiệm:</b> {test.id}</div>
            <div><b>Mã mẫu:</b> {test.sampleCode}</div>
            <div><b>Loại xét nghiệm:</b> {test.testTypeName}</div>
            <div><b>Trạng thái:</b> {test.status}</div>
            <div><b>Tổng tiền:</b> {test.totalAmount?.toLocaleString('vi-VN')}đ</div>
            <div><b>Trạng thái thanh toán:</b> {test.paymentStatus}</div>
          </div>
        )
      ) : (
        <div>Không tìm thấy xét nghiệm.</div>
      )}
      <a href="/tests" style={{ color: '#1976d2', fontWeight: 600 }}>Quay lại danh sách</a>
    </div>
  );
};

export default TestDetail; 