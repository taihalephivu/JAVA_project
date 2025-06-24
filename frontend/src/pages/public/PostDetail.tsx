import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPost } from '../../api';
import { Post } from '../../types';

const PostDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [post, setPost] = useState<Post | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPost = async () => {
            if (!id) return;
            setLoading(true);
            try {
                const res = await getPost(id);
                setPost(res.data as Post);
            } catch (err) {
                setError('Không tìm thấy bài viết.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchPost();
    }, [id]);

    if (loading) {
        return <div style={{ textAlign: 'center', padding: '50px', fontSize: 18 }}>Đang tải bài viết...</div>;
    }

    if (error) {
        return <div style={{ textAlign: 'center', padding: '50px', fontSize: 18, color: 'red' }}>{error}</div>;
    }

    if (!post) {
        return <div style={{ textAlign: 'center', padding: '50px', fontSize: 18, color: 'red' }}>Không có dữ liệu bài viết.</div>;
    }

    return (
        <div style={{ maxWidth: 800, margin: '0 auto', padding: 32 }}>
            <div style={{ background: '#fff', padding: '32px 40px', borderRadius: 12, boxShadow: '0 4px 24px rgba(0,0,0,0.05)' }}>
                <h1 style={{ color: '#1976d2', marginBottom: 16, fontSize: '2.5em' }}>{post.title}</h1>
                <div style={{ color: '#777', marginBottom: 24, borderBottom: '1px solid #eee', paddingBottom: 16 }}>
                    <span>Tác giả: <strong>{post.author.fullName}</strong></span>
                    <span style={{ margin: '0 12px' }}>|</span>
                    <span>Ngày đăng: {new Date(post.createdAt).toLocaleDateString('vi-VN')}</span>
                </div>
                <div style={{ lineHeight: 1.8, fontSize: '1.1em', color: '#333' }} dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br />') }} />

                <a href="/posts" style={{ color: '#1976d2', fontWeight: 600, marginTop: 32, display: 'inline-block', textDecoration: 'none', background: '#f0f4fa', padding: '10px 16px', borderRadius: 8 }}>
                    &larr; Quay lại danh sách bài viết
                </a>
            </div>
        </div>
    );
};

export default PostDetail; 