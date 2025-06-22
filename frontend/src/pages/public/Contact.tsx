import React from 'react';

const Contact: React.FC = () => (
  <div style={{ maxWidth: 600, margin: '0 auto', background: '#fff', borderRadius: 12, boxShadow: '0 4px 24px #0001', padding: 32 }}>
    <h2 style={{ color: '#1976d2', marginBottom: 16 }}>Liên hệ</h2>
    <p style={{ fontSize: 16, marginBottom: 18 }}>
      Địa chỉ: 123 Đường Xét Nghiệm, Quận 1, TP.HCM<br />
      Hotline: 0123 456 789<br />
      Email: info@dnacenter.vn
    </p>
    <form style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <input type="text" placeholder="Họ và tên" required style={{ padding: 10, borderRadius: 6, border: '1px solid #bbb' }} />
      <input type="email" placeholder="Email" required style={{ padding: 10, borderRadius: 6, border: '1px solid #bbb' }} />
      <textarea placeholder="Nội dung liên hệ" required style={{ padding: 10, borderRadius: 6, border: '1px solid #bbb', minHeight: 80 }} />
      <button type="submit" style={{ background: '#1976d2', color: '#fff', padding: '10px 0', borderRadius: 6, fontWeight: 600, fontSize: 16, border: 'none', cursor: 'pointer' }}>Gửi liên hệ</button>
    </form>
  </div>
);

export default Contact; 