import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { postReview } from '../api';

const Footer: React.FC = () => {
  const location = useLocation();
  const path = location.pathname;
  // Các route dashboard/chức năng
  const isDashboard = /^\/(dashboard|admin|customer|appointments|tests|test-results|users|profile)/.test(path);

  // State cho đánh giá
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState('');
  const [userName, setUserName] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      await postReview({ userName: userName.trim() || 'Ẩn danh', rating, comment });
      setSuccess('Cảm ơn bạn đã đánh giá! Đánh giá sẽ được duyệt trước khi hiển thị.');
      setSubmitted(true);
      setRating(0);
      setComment('');
      setUserName('');
      setTimeout(() => setSuccess(null), 3500);
    } catch (err: any) {
      setError('Gửi đánh giá thất bại. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer style={{ background: '#f5f5f5', color: '#555', padding: isDashboard ? '0' : '32px 0 0 0', textAlign: 'center', marginTop: 40 }}>
      {!isDashboard && (
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 40, maxWidth: 1200, margin: '0 auto', padding: '0 16px' }}>
          {/* Đánh giá user */}
          <div style={{ flex: 1, minWidth: 320, maxWidth: 400, background: '#fff', borderRadius: 12, boxShadow: '0 2px 12px #0001', padding: 24, marginBottom: 24 }}>
            <h3 style={{ color: '#1976d2', marginBottom: 10 }}>Đánh giá dịch vụ</h3>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Tên của bạn (tuỳ chọn)"
                value={userName}
                onChange={e => setUserName(e.target.value)}
                style={{ width: '100%', borderRadius: 8, border: '1px solid #bbb', padding: 10, marginBottom: 10, fontSize: 15 }}
                maxLength={100}
              />
              <div style={{ marginBottom: 10 }}>
                {[1,2,3,4,5].map(star => (
                  <span
                    key={star}
                    style={{
                      fontSize: 28,
                      color: (hover || rating) >= star ? '#FFD600' : '#bbb',
                      cursor: 'pointer',
                      transition: 'color 0.18s',
                    }}
                    onMouseEnter={() => setHover(star)}
                    onMouseLeave={() => setHover(0)}
                    onClick={() => setRating(star)}
                    aria-label={`Đánh giá ${star} sao`}
                  >★</span>
                ))}
              </div>
              <textarea
                placeholder="Nhận xét của bạn..."
                value={comment}
                onChange={e => setComment(e.target.value)}
                style={{ width: '100%', borderRadius: 8, border: '1px solid #bbb', padding: 10, minHeight: 48, marginBottom: 10, fontSize: 15 }}
                maxLength={255}
              />
              <button type="submit" style={{ background: '#1976d2', color: '#fff', border: 'none', borderRadius: 8, padding: '8px 22px', fontWeight: 600, fontSize: 15, cursor: loading ? 'not-allowed' : 'pointer', boxShadow: '0 2px 8px #1976d211', transition: 'background 0.18s', opacity: loading ? 0.7 : 1 }}
                onMouseOver={e => (e.currentTarget.style.background = '#0d47a1')}
                onMouseOut={e => (e.currentTarget.style.background = '#1976d2')}
                disabled={rating === 0 || comment.trim() === '' || loading}
              >{loading ? 'Đang gửi...' : 'Gửi đánh giá'}</button>
              {success && <div style={{ color: 'green', marginTop: 10 }}>{success}</div>}
              {error && <div style={{ color: 'red', marginTop: 10 }}>{error}</div>}
            </form>
          </div>
          {/* Bản đồ chỉ dẫn */}
          <div style={{ flex: 1, minWidth: 320, maxWidth: 500, background: '#fff', borderRadius: 12, boxShadow: '0 2px 12px #0001', padding: 24, marginBottom: 24 }}>
            <h3 style={{ color: '#1976d2', marginBottom: 10 }}>Bản đồ chỉ dẫn</h3>
            <div style={{ borderRadius: 10, overflow: 'hidden', boxShadow: '0 2px 8px #1976d211' }}>
              <iframe
                title="Bản đồ trung tâm ADN"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.432247474939!2d106.7004233153342!3d10.77637369232239!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f1c1b1b1b1b%3A0x1b1b1b1b1b1b1b1b!2zMTIzIMSQxrDhu51uZyBY4bqtdCBOZ2hp4buHbSwgUXXhuq1uIDEsIFRow6BuaCBwaOG7kSBI4buTIENow60gTWluaCwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1680000000000!5m2!1svi!2s"
                width="100%"
                height="220"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            <div style={{ color: '#555', fontSize: 15, marginTop: 10 }}>
              Địa chỉ: 123 Đường Xét Nghiệm, Quận 1, TP.HCM
            </div>
          </div>
        </div>
      )}
      {/* Thông tin liên hệ */}
      <div style={{ background: '#f5f5f5', color: '#555', padding: '18px 32px', textAlign: 'center', borderTop: '1px solid #eee' }}>
        Trung tâm Xét nghiệm ADN &copy; {new Date().getFullYear()} | Hotline: 0123 456 789 | Email: info@dnacenter.vn
      </div>
    </footer>
  );
};

export default Footer; 