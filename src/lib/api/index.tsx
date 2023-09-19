import axios from 'axios';
import { useEffect } from 'react';
import { getCookie } from 'cookies-next';
const API_HOST = process.env.NEXT_PUBLIC_API_HOST;
const defaultOptions = {
  baseURL: API_HOST
};
export default function userAPI() {
  const instance = axios.create(defaultOptions);
  useEffect(() => {
    const token = getCookie('_ga_t');
    if (token) {
      instance.interceptors.request.use(function (config) {
        config.headers.Authorization = `Bearer ${token}`;
        return config;
      });
    }
  }, []);

  return instance;
}
