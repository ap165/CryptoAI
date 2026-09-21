import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('cryptoai_token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => {
    // Handle API Gateway wrapped responses that return HTTP 200 but contain an error statusCode
    if (response.data && typeof response.data === 'object' && typeof response.data.statusCode === 'number' && response.data.statusCode >= 400) {
      const error: any = new Error('API Error');
      error.response = { ...response, status: response.data.statusCode };
      
      if (response.data.body && typeof response.data.body === 'string') {
        try {
          error.response.data = JSON.parse(response.data.body);
        } catch (e) {
          error.response.data = { message: response.data.body };
        }
      } else {
        error.response.data = response.data;
      }
      
      // We still want the global error handler below to run if it's a 401
      if (error.response.status === 401) {
        localStorage.removeItem('cryptoai_token');
        localStorage.removeItem('cryptoai_user');
        if (window.location.pathname !== '/login' && window.location.pathname !== '/signup') {
          window.location.href = '/login';
        }
      }
      
      return Promise.reject(error);
    }
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('cryptoai_token');
      localStorage.removeItem('cryptoai_user');
      if (window.location.pathname !== '/login' && window.location.pathname !== '/signup') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
