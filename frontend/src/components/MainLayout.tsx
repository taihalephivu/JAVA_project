import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { User } from '../types';
import NotificationBell from './NotificationBell';
import { useEffect, useState } from 'react';

interface MainLayoutProps {
  user: User | null;
  onLogout?: () => void;
  children: React.ReactNode;
}

const ScrollToTopButton = () => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 200);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  return visible ? (
    <button
      onClick={scrollToTop}
      style={{
        position: 'fixed',
        bottom: 32,
        right: 32,
        zIndex: 1100,
        background: '#1976d2',
        color: '#fff',
        border: 'none',
        borderRadius: '50%',
        width: 48,
        height: 48,
        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
        fontSize: 28,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      aria-label="Lên đầu trang"
    >
      ↑
    </button>
  ) : null;
};

const MainLayout: React.FC<MainLayoutProps> = ({ user, onLogout, children }) => (
  <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
    <Header user={user} onLogout={onLogout} />
    <main style={{ flex: 1, padding: '32px 0', background: '#f9f9f9', position: 'relative' }}>
      {children}
      <div style={{ position: 'fixed', bottom: 96, right: 32, zIndex: 1100 }}>
        <NotificationBell />
      </div>
      <ScrollToTopButton />
    </main>
    <Footer />
  </div>
);

export default MainLayout; 