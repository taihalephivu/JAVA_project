import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
});

export default api;

export const login = (data: { username: string; password: string }) => api.post('/auth/login', data);
export const register = (data: any) => api.post('/auth/signup', data);
// Thêm các hàm gọi API khác ở đây 