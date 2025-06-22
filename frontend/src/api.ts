import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
});

export const login = (data: { username: string; password: string }) =>
  api.post('/auth/login', data);

export const register = (data: any) =>
  api.post('/auth/signup', data);

export const getMe = () => api.get('/auth/me');

export const createAppointment = (data: any) =>
  api.post('/appointments', data);

export const getMyTests = () => api.get('/tests/my-tests');

export const getAllAppointments = () => api.get('/appointments');

export const updateTestStatus = (id: number, status: string) =>
  api.put(`/tests/${id}/status`, null, { params: { status } });

export const enterTestResult = (id: number, resultData: string) =>
  api.post(`/test-results`, { testId: id, resultData });

export default api; 