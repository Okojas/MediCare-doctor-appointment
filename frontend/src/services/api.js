import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'https://medicare-doctor-appointment-production.up.railway.app';
const API = `${BACKEND_URL}/api`;
console.log('Backend URL:', BACKEND_URL); // Debug line

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle response errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Unauthorized - clear token and redirect to login
      localStorage.removeItem('token');
      localStorage.removeItem('medicalAppUser');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth APIs
export const authAPI = {
  register: async (userData) => {
    const response = await apiClient.post('/auth/register', userData);
    return response.data;
  },

  login: async (credentials) => {
    const response = await apiClient.post('/auth/login', credentials);
    return response.data;
  },

  getCurrentUser: async () => {
    const response = await apiClient.get('/auth/me');
    return response.data;
  },
};

// Doctor APIs
export const doctorAPI = {
  getAll: async (params = {}) => {
    const response = await apiClient.get('/doctors', { params });
    return response.data;
  },

  getById: async (doctorId) => {
    const response = await apiClient.get(`/doctors/${doctorId}`);
    return response.data;
  },
};

// Appointment APIs
export const appointmentAPI = {
  create: async (appointmentData) => {
    const response = await apiClient.post('/appointments', appointmentData);
    return response.data;
  },

  getAll: async (params = {}) => {
    const response = await apiClient.get('/appointments', { params });
    return response.data;
  },

  updateStatus: async (appointmentId, status) => {
    const response = await apiClient.patch(`/appointments/${appointmentId}/status`, { status });
    return response.data;
  },

  getVideoToken: async (appointmentId) => {
    const response = await apiClient.get(`/consultations/${appointmentId}/token`);
    return response.data;
  },

  cancel: async (appointmentId) => {
    const response = await apiClient.patch(`/appointments/${appointmentId}/status`, {
      status: 'cancelled'
    });
    return response.data;
  },
};

// Admin APIs
export const adminAPI = {
  getStats: async () => {
    const response = await apiClient.get('/admin/stats');
    return response.data;
  },
};

// Medical Records APIs (to be implemented)
export const medicalRecordAPI = {
  getAll: async () => {
    const response = await apiClient.get('/medical-records');
    return response.data;
  },

  upload: async (formData) => {
    const response = await apiClient.post('/medical-records', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
};

// Payment APIs (to be implemented)
export const paymentAPI = {
  createOrder: async (appointmentData) => {
    const response = await apiClient.post('/payments/create-order', appointmentData);
    return response.data;
  },

  verifyPayment: async (paymentData) => {
    const response = await apiClient.post('/payments/verify', paymentData);
    return response.data;
  },
};

export default apiClient;
