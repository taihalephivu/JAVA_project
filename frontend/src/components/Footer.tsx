import React from 'react';

const Footer: React.FC = () => (
  <footer style={{ background: '#f5f5f5', color: '#555', padding: '18px 32px', textAlign: 'center', marginTop: 40 }}>
    <div>Trung tâm Xét nghiệm ADN &copy; {new Date().getFullYear()} | Hotline: 0123 456 789 | Email: info@dnacenter.vn</div>
  </footer>
);

export default Footer; 