import axios from 'axios';

// Create an Axios instance
const instance = axios.create({
  baseURL: 'https://khukha.banisadar.com/api', 
  // timeout: 10000,
  withCredentials: true,
  headers: {
      'Accept': 'application/json',
      "Content-Type": "application/json",
  },
});
export const baseImgURL = 'https://khukha.banisadar.com/img/';

// Check if there's a token in localStorage
const token = localStorage.getItem('auth_token');

// If token exists, set the Authorization header for all requests
if (token) {
  instance.defaults.headers['Authorization'] = `Bearer ${token}`;
}

// Add a request interceptor to handle token dynamically for every request
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor (optional) to handle errors or responses globally
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle unauthorized error (e.g., redirect to login or logout)
    if (error.response && error.response.status === 401) {
      // Optional: Clear token and redirect to login
      localStorage.removeItem('auth_token');
      window.location.href = '/login';  // Change this to your login page path
    }
    return Promise.reject(error);
  }
);

export default instance;
