import React, { useEffect, useState } from 'react';
import { getPosts, createPost, updatePost, deletePost } from '../../api';
import { Post, Page } from '../../types';

const AdminPostManager: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: '', content: '' });
  const [editingId, setEditingId] = useState<number | null>(null);

  const fetchPosts = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getPosts(0, 100);
      setPosts((res.data as Page<Post>).content || []);
    } catch (err) {
      setError('Không thể tải danh sách bài viết.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchPosts(); }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updatePost(editingId.toString(), form);
      } else {
        await createPost(form);
      }
      setShowForm(false);
      setForm({ title: '', content: '' });
      setEditingId(null);
      fetchPosts();
    } catch {
      setError('Lưu bài viết thất bại.');
    }
  };

  const handleEdit = (post: Post) => {
    setForm({ title: post.title, content: post.content });
    setEditingId(post.id);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Xóa bài viết này?')) return;
    try {
      await deletePost(id.toString());
      fetchPosts();
    } catch {
      setError('Xóa bài viết thất bại.');
    }
  };

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', background: '#fff', borderRadius: 12, boxShadow: '0 4px 24px #0001', padding: 0 }}>
      <div style={{ background: '#e3f0fd', borderTopLeftRadius: 12, borderTopRightRadius: 12, padding: '24px 32px 12px 32px', borderLeft: '6px solid #1976d2', boxShadow: '0 2px 12px #1976d211' }}>
        <h2 style={{ color: '#1976d2', marginBottom: 0, fontSize: 26, fontWeight: 700 }}>Quản lý bài viết</h2>
      </div>
      <div style={{ padding: 32 }}>
        <button onClick={() => { setShowForm(true); setEditingId(null); setForm({ title: '', content: '' }); }} style={{ background: '#1976d2', color: '#fff', padding: '10px 20px', borderRadius: 6, fontWeight: 600, marginBottom: 18 }}>Tạo bài viết mới</button>
        {showForm && (
          <form onSubmit={handleSubmit} style={{ marginBottom: 24, background: '#f9f9f9', padding: 18, borderRadius: 8 }}>
            <input name="title" placeholder="Tiêu đề" value={form.title} onChange={handleChange} required style={{ width: '100%', padding: 10, borderRadius: 6, border: '1px solid #bbb', marginBottom: 10 }} />
            <textarea name="content" placeholder="Nội dung" value={form.content} onChange={handleChange} required style={{ width: '100%', padding: 10, borderRadius: 6, border: '1px solid #bbb', minHeight: 80, marginBottom: 10 }} />
            <button type="submit" style={{ background: '#1976d2', color: '#fff', padding: '8px 18px', borderRadius: 6, fontWeight: 600 }}>{editingId ? 'Cập nhật' : 'Tạo mới'}</button>
            <button type="button" onClick={() => { setShowForm(false); setEditingId(null); setForm({ title: '', content: '' }); }} style={{ marginLeft: 12, background: '#bbb', color: '#fff', padding: '8px 18px', borderRadius: 6, fontWeight: 600 }}>Hủy</button>
          </form>
        )}
        {error && <div style={{ color: 'red', marginBottom: 12 }}>{error}</div>}
        {loading ? <div>Đang tải...</div> : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f0f4fa' }}>
                <th style={{ padding: 10 }}>ID</th>
                <th style={{ padding: 10 }}>Tiêu đề</th>
                <th style={{ padding: 10 }}>Ngày tạo</th>
                <th style={{ padding: 10 }}>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {posts.map(post => (
                <tr key={post.id}>
                  <td style={{ padding: 10 }}>{post.id}</td>
                  <td style={{ padding: 10 }}>{post.title}</td>
                  <td style={{ padding: 10 }}>{new Date(post.createdAt).toLocaleDateString('vi-VN')}</td>
                  <td style={{ padding: 10 }}>
                    <button onClick={() => handleEdit(post)} style={{ marginRight: 8, background: '#1976d2', color: '#fff', border: 'none', borderRadius: 4, padding: '4px 10px', fontWeight: 600 }}>Sửa</button>
                    <button onClick={() => handleDelete(post.id)} style={{ background: '#d32f2f', color: '#fff', border: 'none', borderRadius: 4, padding: '4px 10px', fontWeight: 600 }}>Xóa</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminPostManager; 