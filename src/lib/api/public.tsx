import axios from 'axios';
const API_HOST = process.env.NEXT_PUBLIC_API_HOST;
const API_TOKEN = process.env.NEXT_PUBLIC_API_TOKEN;
const defaultOptions = {
  baseURL: API_HOST,
  headers: {
    Authorization: `Bearer ${API_TOKEN}`
  }
};
export default function publicAPI() {
  const instance = axios.create(defaultOptions);
  return instance;
}
