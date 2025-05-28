import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  withCredentials: true, // nếu dùng Sanctum + cookie
});

export default api;
