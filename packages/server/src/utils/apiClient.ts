import axios from 'axios';

export const client = axios.create({
  baseURL: '/api',
});
client.interceptors.request.use((req) => {
  if (!req.headers) {
    req.headers = {};
  }

  const token = localStorage.getItem('token');
  if (token) {
    req.headers.authorization = `Bearer ${token}`;
  }

  return req;
});
