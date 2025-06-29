import React, { useState, useEffect, useRef } from 'react';
import { getNotifications, getUnreadNotificationCount, markAllNotificationsAsRead, markNotificationAsRead } from '../api';
import { Notification } from '../types';
import { useNavigate } from 'react-router-dom';

const NotificationBell: React.FC = () => {
    const [unreadCount, setUnreadCount] = useState(0);
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const dropdownRef = useRef<HTMLDivElement>(null);

    const fetchUnreadCount = async () => {
        try {
            const res = await getUnreadNotificationCount();
            setUnreadCount((res.data as { count: number }).count);
        } catch (error) {
            console.error('Failed to fetch unread notification count:', error);
        }
    };

    useEffect(() => {
        fetchUnreadCount();
        const interval = setInterval(fetchUnreadCount, 60000); // Poll every 60 seconds
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleBellClick = async () => {
        setIsOpen(!isOpen);
        if (!isOpen) {
            try {
                const res = await getNotifications();
                setNotifications(res.data as Notification[]);
            } catch (error) {
                console.error('Failed to fetch notifications:', error);
            }
        }
    };

    const handleNotificationClick = async (notification: Notification) => {
        try {
            if (!notification.read) {
                await markNotificationAsRead(notification.id);
                setUnreadCount(prev => Math.max(0, prev - 1));
                setNotifications(prev => prev.map(n => n.id === notification.id ? { ...n, read: true } : n));
            }
            navigate(notification.link);
            setIsOpen(false);
        } catch (error) {
            console.error('Failed to mark notification as read:', error);
        }
    };

    const handleMarkAllRead = async () => {
        try {
            await markAllNotificationsAsRead();
            setUnreadCount(0);
            setNotifications(prev => prev.map(n => ({ ...n, read: true })));
        } catch (error) {
            console.error('Failed to mark all notifications as read:', error);
        }
    };

    return (
        <div style={{ position: 'relative', cursor: 'pointer', marginRight: 18 }} ref={dropdownRef}>
            <span style={{ fontSize: 24 }} onClick={handleBellClick}>🔔</span>
            {unreadCount > 0 && (
                <span style={{
                    position: 'absolute', top: -5, right: -8, background: 'red', color: 'white',
                    borderRadius: '50%', padding: '2px 6px', fontSize: '12px', fontWeight: 'bold',
                    pointerEvents: 'none'
                }}>
                    {unreadCount}
                </span>
            )}
            {isOpen && (
                <div style={{
                    position: 'absolute', top: '120%', right: 0, background: 'white', color: '#333',
                    borderRadius: 8, boxShadow: '0 4px 20px rgba(0,0,0,0.15)', width: 350,
                    zIndex: 1000, border: '1px solid #eee'
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', borderBottom: '1px solid #eee' }}>
                        <h4 style={{ margin: 0, fontSize: 16 }}>Thông báo</h4>
                        <button onClick={handleMarkAllRead} disabled={unreadCount === 0} style={{
                            background: 'none', border: 'none', color: '#1976d2', cursor: 'pointer',
                            fontSize: 13, fontWeight: 600, opacity: unreadCount === 0 ? 0.5 : 1
                        }}>
                            Đánh dấu tất cả đã đọc
                        </button>
                    </div>
                    <div style={{ maxHeight: 400, overflowY: 'auto' }}>
                        {notifications.length > 0 ? (
                            notifications.map(n => (
                                <div key={n.id} onClick={() => handleNotificationClick(n)} style={{
                                    padding: '12px 16px', borderBottom: '1px solid #f5f5f5',
                                    background: n.read ? 'white' : '#f0f8ff'
                                }}>
                                    <p style={{ margin: 0, fontWeight: n.read ? 400 : 600 }}>{n.message}</p>
                                    <small style={{ color: '#777' }}>{new Date(n.createdAt).toLocaleString('vi-VN')}</small>
                                </div>
                            ))
                        ) : (
                            <p style={{ textAlign: 'center', padding: 24, color: '#888' }}>Không có thông báo mới.</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default NotificationBell;
