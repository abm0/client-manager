import axios from 'axios';
import { API_HOST } from '../shared/constants';

const api = axios.create({
  baseURL: `${API_HOST}/api`,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export { api };
