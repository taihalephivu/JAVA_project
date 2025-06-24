import React, { useState } from 'react';
import { sendContactMessage } from '../../api';

const Contact: React.FC = () => {
    const [form, setForm] = useState({ fullName: '', email: '', content: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(null);
        try {
            const res = await sendContactMessage(form);
            setSuccess((res.data as { message: string }).message);
            setForm({ fullName: '', email: '', content: '' }); // Clear form on success
        } catch (err: any) {
            setError(err.response?.data?.message || 'Gửi liên hệ thất bại. Vui lòng thử lại.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: 600, margin: '0 auto', background: '#fff', borderRadius: 12, boxShadow: '0 4px 24px rgba(0,0,0,0.05)', padding: 32 }}>
            <h2 style={{ color: '#1976d2', marginBottom: 16 }}>Liên hệ với chúng tôi</h2>
            <p style={{ fontSize: 16, marginBottom: 18, color: '#555' }}>
                Địa chỉ: 123 Đường Xét Nghiệm, Quận 1, TP.HCM<br />
                Hotline: 0123 456 789<br />
                Email: info@dnacenter.vn
            </p>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <input name="fullName" type="text" placeholder="Họ và tên" value={form.fullName} onChange={handleChange} required style={{ padding: 12, borderRadius: 6, border: '1px solid #ccc', fontSize: 16 }} />
                <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required style={{ padding: 12, borderRadius: 6, border: '1px solid #ccc', fontSize: 16 }} />
                <textarea name="content" placeholder="Nội dung liên hệ" value={form.content} onChange={handleChange} required style={{ padding: 12, borderRadius: 6, border: '1px solid #ccc', minHeight: 100, fontSize: 16 }} />
                <button type="submit" disabled={loading} style={{ background: '#1976d2', color: '#fff', padding: '12px 0', borderRadius: 6, fontWeight: 600, fontSize: 16, border: 'none', cursor: 'pointer', opacity: loading ? 0.7 : 1 }}>
                    {loading ? 'Đang gửi...' : 'Gửi liên hệ'}
                </button>
                {success && <div style={{ color: 'green', background: '#e8f5e9', padding: 12, borderRadius: 6, textAlign: 'center', marginTop: 8 }}>{success}</div>}
                {error && <div style={{ color: 'red', background: '#fce4e4', padding: 12, borderRadius: 6, textAlign: 'center', marginTop: 8 }}>{error}</div>}
            </form>
        </div>
    );
};

export default Contact; 