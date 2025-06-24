import React from 'react';

const CustomerDashboard: React.FC = () => (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 16px' }}>
        <div style={{ background: '#fff', borderRadius: 12, boxShadow: '0 4px 24px rgba(0,0,0,0.05)', padding: 32, marginBottom: 24 }}>
            <h2 style={{ color: '#1976d2', marginBottom: 16 }}>Dashboard Khách hàng</h2>
            <p style={{ color: '#555', fontSize: 16 }}>
                Chào mừng bạn đến với trang quản lý cá nhân. Tại đây bạn có thể dễ dàng xem và quản lý các lịch hẹn, theo dõi tiến trình xét nghiệm và xem kết quả.
            </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
            <a href="/appointments" style={{ textDecoration: 'none', color: 'inherit' }}>
                <div style={{ background: '#fff', borderRadius: 12, padding: 24, boxShadow: '0 4px 24px rgba(0,0,0,0.05)', transition: 'all 0.2s ease-in-out', cursor: 'pointer' }}>
                    <h3 style={{ color: '#1976d2', marginTop: 0 }}>📅 Quản lý Lịch hẹn</h3>
                    <p style={{ color: '#666' }}>Xem danh sách, tạo lịch hẹn mới và theo dõi trạng thái các lịch hẹn của bạn.</p>
                </div>
            </a>
            <a href="/tests" style={{ textDecoration: 'none', color: 'inherit' }}>
                <div style={{ background: '#fff', borderRadius: 12, padding: 24, boxShadow: '0 4px 24px rgba(0,0,0,0.05)', transition: 'all 0.2s ease-in-out', cursor: 'pointer' }}>
                    <h3 style={{ color: '#1976d2', marginTop: 0 }}>🧪 Quản lý Xét nghiệm</h3>
                    <p style={{ color: '#666' }}>Theo dõi các mẫu xét nghiệm và trạng thái xử lý của chúng.</p>
                </div>
            </a>
            <a href="/test-results" style={{ textDecoration: 'none', color: 'inherit' }}>
                <div style={{ background: '#fff', borderRadius: 12, padding: 24, boxShadow: '0 4px 24px rgba(0,0,0,0.05)', transition: 'all 0.2s ease-in-out', cursor: 'pointer' }}>
                    <h3 style={{ color: '#1976d2', marginTop: 0 }}>📄 Xem Kết quả</h3>
                    <p style={{ color: '#666' }}>Truy cập và xem chi tiết kết quả các xét nghiệm đã hoàn thành.</p>
                </div>
            </a>
            <a href="/profile" style={{ textDecoration: 'none', color: 'inherit' }}>
                <div style={{ background: '#fff', borderRadius: 12, padding: 24, boxShadow: '0 4px 24px rgba(0,0,0,0.05)', transition: 'all 0.2s ease-in-out', cursor: 'pointer' }}>
                    <h3 style={{ color: '#1976d2', marginTop: 0 }}>👤 Thông tin Cá nhân</h3>
                    <p style={{ color: '#666' }}>Cập nhật thông tin liên lạc và các chi tiết cá nhân khác của bạn.</p>
                </div>
            </a>
        </div>
    </div>
);

export default CustomerDashboard; 