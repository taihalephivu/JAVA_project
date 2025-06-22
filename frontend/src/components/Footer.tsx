import React from 'react';

const Footer: React.FC = () => (
  <footer style={{ background: '#222', color: '#fff', textAlign: 'center', padding: 16, fontSize: 15 }}>
    &copy; {new Date().getFullYear()} DNA Testing Service. Liên hệ: info@dnatesting.com
  </footer>
);

export default Footer; 