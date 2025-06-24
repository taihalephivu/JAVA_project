import React, { useEffect, useState } from 'react';
import { getPosts } from '../../api';
import { Post, Page } from '../../types';

const Posts: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            setError(null);
            try {
                const res = await getPosts(page, 10); // Fetch 10 posts per page
                const pageData = res.data as Page<Post>;
                setPosts(pageData.content);
                setTotalPages(pageData.totalPages);
            } catch (err) {
                setError('Không thể tải danh sách bài viết.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, [page]);

    const getSnippet = (content: string, length = 150) => {
        if (content.length <= length) return content;
        return content.substring(0, length) + '...';
    };

    return (
        <div style={{ maxWidth: 800, margin: '0 auto', padding: 32 }}>
            <h2 style={{ color: '#1976d2', marginBottom: 24, borderBottom: '2px solid #1976d2', paddingBottom: 8 }}>Bài viết & Tin tức</h2>

            {loading ? (
                <div style={{ textAlign: 'center', padding: 48, fontSize: 18 }}>Đang tải bài viết...</div>
            ) : error ? (
                <div style={{ color: 'red', textAlign: 'center', padding: 48 }}>{error}</div>
            ) : posts.length === 0 ? (
                <div style={{ textAlign: 'center', padding: 48, color: '#555' }}>Chưa có bài viết nào.</div>
            ) : (
                <>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                        {posts.map(post => (
                            <div key={post.id} style={{ background: '#fff', padding: 24, borderRadius: 12, boxShadow: '0 4px 24px rgba(0,0,0,0.05)', transition: 'transform 0.2s', }}>
                                <a href={`/posts/${post.id}`} style={{ textDecoration: 'none' }}>
                                    <h3 style={{ color: '#333', marginTop: 0, marginBottom: 8 }}>{post.title}</h3>
                                </a>
                                <p style={{ color: '#666', margin: '0 0 16px 0' }}>{getSnippet(post.content)}</p>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <a href={`/posts/${post.id}`} style={{ color: '#1976d2', fontWeight: 600 }}>Xem chi tiết &rarr;</a>
                                    <small style={{ color: '#999' }}>
                                        Tác giả: {post.author.fullName} | {new Date(post.createdAt).toLocaleDateString('vi-VN')}
                                    </small>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 32, gap: 16 }}>
                        <button
                            onClick={() => setPage(p => p - 1)}
                            disabled={page === 0}
                            style={{ padding: '8px 16px', borderRadius: 6, border: '1px solid #1976d2', background: page > 0 ? '#fff' : '#f0f0f0', color: '#1976d2', cursor: 'pointer', fontWeight: 600 }}
                        >
                            &larr; Trang trước
                        </button>
                        <span style={{ color: '#555' }}>Trang {page + 1} / {totalPages}</span>
                        <button
                            onClick={() => setPage(p => p + 1)}
                            disabled={page >= totalPages - 1}
                            style={{ padding: '8px 16px', borderRadius: 6, border: 'none', background: '#1976d2', color: 'white', cursor: 'pointer', fontWeight: 600, opacity: page >= totalPages - 1 ? 0.6 : 1 }}
                        >
                            Trang sau &rarr;
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default Posts; 