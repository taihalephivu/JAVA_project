import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { User } from '../types';

interface MainLayoutProps {
  user: User | null;
  onLogout?: () => void;
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ user, onLogout, children }) => (
  <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#f7f9fb' }}>
    <Header user={user} onLogout={onLogout} />
    <main style={{ flex: 1, padding: '32px 0', maxWidth: 1000, margin: '0 auto', width: '100%' }}>
      {children}
    </main>
    <Footer />
  </div>
);

export default MainLayout; 