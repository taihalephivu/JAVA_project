import React, { useEffect, useState } from 'react';
import { getAllReviews, approveReview, deleteReview } from '../../api';

interface Review {
  id: number;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
  approved: boolean;
}

const AdminReviewManager: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState<number | null>(null);

  const fetchReviews = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getAllReviews();
      setReviews(response.data || []);
    } catch (err) {
      setError('Không thể tải danh sách nhận xét.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleApprove = async (reviewId: number) => {
    setActionLoading(reviewId);
    try {
      await approveReview(reviewId);
      fetchReviews();
    } catch (err) {
      alert('Phê duyệt nhận xét thất bại!');
    } finally {
      setActionLoading(null);
    }
  };

  const handleDelete = async (reviewId: number) => {
    if (!window.confirm('Xóa nhận xét này?')) return;
    setActionLoading(reviewId);
    try {
      await deleteReview(reviewId);
      fetchReviews();
    } catch (err) {
      alert('Xóa nhận xét thất bại!');
    } finally {
      setActionLoading(null);
    }
  };

  const getStatusColor = (approved: boolean) => {
    return approved ? '#4caf50' : '#ff9800';
  };

  const getStatusText = (approved: boolean) => {
    return approved ? 'Đã phê duyệt' : 'Chờ phê duyệt';
  };

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', background: '#fff', borderRadius: 12, boxShadow: '0 4px 24px #0001', padding: 32 }}>
      <h2 style={{ color: '#1976d2', marginBottom: 16 }}>Quản lý nhận xét khách hàng</h2>
      
      {error && <div style={{ color: 'red', marginBottom: 12 }}>{error}</div>}
      
      {loading ? (
        <div>Đang tải...</div>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 20 }}>
          <thead>
            <tr style={{ background: '#f0f4fa' }}>
              <th style={{ padding: 10 }}>ID</th>
              <th style={{ padding: 10 }}>Tên khách hàng</th>
              <th style={{ padding: 10 }}>Đánh giá</th>
              <th style={{ padding: 10 }}>Nội dung</th>
              <th style={{ padding: 10 }}>Trạng thái</th>
              <th style={{ padding: 10 }}>Ngày tạo</th>
              <th style={{ padding: 10 }}>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map(review => (
              <tr key={review.id} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: 10 }}>{review.id}</td>
                <td style={{ padding: 10 }}>{review.userName}</td>
                <td style={{ padding: 10 }}>
                  <div style={{ color: '#FFD600', fontSize: 18 }}>
                    {Array.from({ length: review.rating }).map((_, i) => <span key={i}>★</span>)}
                    {Array.from({ length: 5 - review.rating }).map((_, i) => <span key={i} style={{ color: '#bbb' }}>★</span>)}
                  </div>
                </td>
                <td style={{ padding: 10, maxWidth: 300 }}>
                  <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {review.comment}
                  </div>
                </td>
                <td style={{ padding: 10 }}>
                  <span style={{ 
                    color: getStatusColor(review.approved), 
                    fontWeight: 600,
                    padding: '4px 8px',
                    borderRadius: 4,
                    background: getStatusColor(review.approved) + '20'
                  }}>
                    {getStatusText(review.approved)}
                  </span>
                </td>
                <td style={{ padding: 10 }}>{new Date(review.createdAt).toLocaleDateString('vi-VN')}</td>
                <td style={{ padding: 10 }}>
                  {!review.approved && (
                    <button 
                      onClick={() => handleApprove(review.id)}
                      disabled={actionLoading === review.id}
                      style={{ background: '#4caf50', color: '#fff', border: 'none', borderRadius: 4, padding: '4px 10px', marginRight: 8, cursor: 'pointer' }}
                    >
                      {actionLoading === review.id ? 'Đang xử lý...' : 'Phê duyệt'}
                    </button>
                  )}
                  <button 
                    onClick={() => handleDelete(review.id)}
                    disabled={actionLoading === review.id}
                    style={{ background: '#d32f2f', color: '#fff', border: 'none', borderRadius: 4, padding: '4px 10px', cursor: 'pointer' }}
                  >
                    {actionLoading === review.id ? 'Đang xử lý...' : 'Xóa'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {reviews.length === 0 && !loading && (
        <div style={{ textAlign: 'center', color: '#666', padding: 40 }}>
          Chưa có nhận xét nào.
        </div>
      )}
    </div>
  );
};

export default AdminReviewManager; 