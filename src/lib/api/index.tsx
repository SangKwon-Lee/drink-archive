import axios from 'axios';
import { useEffect } from 'react';

const API_HOST = process.env.NEXT_PUBLIC_API_HOST;
const defaultOptions = {
  baseURL: API_HOST
};
export default function useAPI() {
  const instance = axios.create(defaultOptions);
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      instance.interceptors.request.use(function (config) {
        config.headers.Authorization = `Bearer ${token}`;
        return config;
      });
    }
  }, []);

  return instance;
}
