import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
});

// Đính kèm token vào header nếu có
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Auth
export const login = (data: { username: string; password: string }) => api.post('/auth/login', data);
export const register = (data: any) => api.post('/auth/signup', data);

// Appointments
export const getAppointments = (isAdmin = false) =>
  isAdmin ? api.get('/appointments') : api.get('/appointments/my');
export const getAppointment = (id: string) => api.get(`/appointments/${id}`);
export const createAppointment = (data: any) => api.post('/appointments', data);
export const updateAppointment = (id: string, data: any) => api.put(`/appointments/${id}`, data);
export const deleteAppointment = (id: string) => api.delete(`/appointments/${id}`);

// Tests
export const getTests = (isAdmin = false) =>
  isAdmin ? api.get('/tests') : api.get('/tests/my');
export const getTest = (id: string) => api.get(`/tests/${id}`);
export const createTest = (data: any) => api.post('/tests', data);
export const updateTest = (id: string, data: any) => api.put(`/tests/${id}`, data);
export const deleteTest = (id: string) => api.delete(`/tests/${id}`);

// TestResults
export const getTestResults = (isAdmin = false) =>
  isAdmin ? api.get('/test-results') : api.get('/test-results/my');
export const getTestResult = (id: string) => api.get(`/test-results/${id}`);
export const createTestResult = (data: any) => api.post('/test-results', data);
export const updateTestResult = (id: string, data: any) => api.put(`/test-results/${id}`, data);
export const deleteTestResult = (id: string) => api.delete(`/test-results/${id}`);

// Users (admin)
export const getUsers = () => api.get('/users');
export const getUser = (id: string) => api.get(`/users/${id}`);
export const deleteUser = (id: string) => api.delete(`/users/${id}`);

// Profile
export const getProfile = (id: string) => api.get(`/users/${id}`);
export const updateProfile = (id: string, data: any) => api.put(`/users/${id}`, data);

// Thêm các hàm gọi API khác ở đây 