import axios from 'axios';

const calendarApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:2000/api',
});

calendarApi.interceptors.request.use(config => {
  config.headers = {
    ...config.headers,
    'x-token': localStorage.getItem('token'),
  };
  return config;
});

export default calendarApi;
