import axios from 'axios';
import { useEffect, useState } from 'react';

const API_HOST = process.env.NEXT_PUBLIC_API_HOST;

export default function useAPI() {
  const [token, setToken] = useState('');
  useEffect(() => {
    if (localStorage) {
      setToken(localStorage.getItem('token') || '');
    }
  }, []);

  return axios.create({
    baseURL: API_HOST,
    headers: {
      Authorization: token ? `Bearer ${token}` : ''
    },
    timeout: 5000
  });
}
