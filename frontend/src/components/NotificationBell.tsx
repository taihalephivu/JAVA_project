import React, { useState } from 'react';

const NotificationBell: React.FC = () => {
  // TODO: Tích hợp logic lấy và hiển thị thông báo thật
  const [notificationCount] = useState(3); // Giả lập có 3 thông báo

  return (
    <div style={{ position: 'relative', cursor: 'pointer', marginRight: 18 }}>
      <span style={{ fontSize: 24 }}>🔔</span>
      {notificationCount > 0 && (
        <span style={{
          position: 'absolute',
          top: -5,
          right: -8,
          background: 'red',
          color: 'white',
          borderRadius: '50%',
          padding: '2px 6px',
          fontSize: '12px',
          fontWeight: 'bold'
        }}>
          {notificationCount}
        </span>
      )}
    </div>
  );
};

export default NotificationBell; 