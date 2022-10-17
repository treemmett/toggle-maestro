import axios, { AxiosError } from 'axios';
import * as errors from './errors';

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

client.interceptors.response.use(
  (r) => r,
  (err: AxiosError<{ error: { code: string; message: string } }>) => {
    if (err.response?.data?.error?.code) {
      const found = Object.entries(errors).find(([name]) => name === err.response?.data.error.code);

      if (found) {
        throw new found[1](err.response?.data.error.message, err.response.status);
      }
    }

    throw new errors.UnknownError();
  }
);
