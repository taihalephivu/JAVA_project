import axios from 'axios';
import { TestPackage } from './types';

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
});

// Đính kèm token vào header nếu có
api.interceptors.request.use(config => {
  if (!config.headers) {
    config.headers = {};
  }
  // Không gửi token cho login/signup
  if (
    config.url &&
    !config.url.includes('/auth/login') &&
    !config.url.includes('/auth/signup')
  ) {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// Auth
export const login = (data: { username: string; password: string }) => api.post('/auth/login', data);
export const register = (data: any) => api.post('/auth/signup', data);

// Appointments
export const getAppointments = (isAdmin = false) =>
  isAdmin ? api.get('/appointments') : api.get('/appointments/my-appointments');
export const getAppointment = (id: string) => api.get(`/appointments/${id}`);
export const createAppointment = (data: any) => api.post('/appointments', data);
export const updateAppointment = (id: string, data: any) => api.put(`/appointments/${id}`, data);
export const deleteAppointment = (id: string) => api.delete(`/appointments/${id}`);
export const updateAppointmentStatus = (id: string | number, status: string) => api.put(`/appointments/${id}/status`, null, { params: { status } });

// Tests
export const getTests = (isAdmin = false) =>
  isAdmin ? api.get('/tests') : api.get('/tests/my-tests');
export const getTest = (id: string) => api.get(`/tests/${id}`);
export const createTest = (data: any) => api.post('/tests', data);
export const updateTest = (id: string, data: any) => api.put(`/tests/${id}`, data);
export const deleteTest = (id: string) => api.delete(`/tests/${id}`);

// TestResults
export const getTestResults = (isAdmin = false) =>
  isAdmin ? api.get('/test-results') : api.get('/test-results/my-results');
export const getTestResult = (id: string) => api.get(`/test-results/${id}`);
export const getTestResultByTestId = (testId: string) => api.get(`/test-results/test/${testId}`);
export const createTestResult = (data: any) => api.post('/test-results', data);
export const updateTestResult = (id: string, data: any) => api.put(`/test-results/${id}`, data);
export const deleteTestResult = (id: string) => api.delete(`/test-results/${id}`);
export const checkIfTestResultExists = (testId: string) => api.get(`/test-results/check-test/${testId}`);

// Users (admin)
export const getUsers = () => api.get('/users');
export const getUser = (id: string) => api.get(`/users/${id}`);
export const deleteUser = (id: string) => api.delete(`/users/${id}`);
export const updateUser = (id: string, data: any) => api.put(`/users/${id}`, data);

// Profile
export const getProfile = () => api.get(`/users/me`);
export const updateProfile = (data: any) => api.put(`/users/me`, data);

// Notifications
export const getNotifications = () => api.get('/notifications');
export const getUnreadNotificationCount = () => api.get('/notifications/count');
export const markNotificationAsRead = (id: number) => api.put(`/notifications/${id}/read`);
export const markAllNotificationsAsRead = () => api.put('/notifications/mark-all-as-read');

// Posts
export const getPosts = (page: number, size: number) => api.get(`/posts?page=${page}&size=${size}`);
export const getPost = (id: string) => api.get(`/posts/${id}`);
export const createPost = (data: { title: string, content: string }) => api.post('/posts', data);
export const updatePost = (id: string, data: { title: string, content: string }) => api.put(`/posts/${id}`, data);
export const deletePost = (id: string) => api.delete(`/posts/${id}`);

// Contact
export const sendContactMessage = (data: { fullName: string, email: string, content: string }) => api.post('/contact', data);

// TestPackage API
export const getPackages = () => api.get('/packages').then(res => res.data);

export const getPackage = (id: number) => api.get(`/packages/${id}`).then(res => res.data);

export const createPackage = (pkg: TestPackage) => api.post('/packages', pkg).then(res => res.data);

export const updatePackage = (id: number, pkg: TestPackage) => api.put(`/packages/${id}`, pkg).then(res => res.data);

export const deletePackage = (id: number) => api.delete(`/packages/${id}`);

// Thêm các hàm gọi API khác ở đây 