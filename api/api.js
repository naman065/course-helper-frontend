import axios from 'axios';

const API_BASE_URL = 'http://localhost:4000'; // Update with your backend URL if needed

// Set up Axios instance
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Function to set Auth Token
export const setAuthToken = (token) => {
  if (token) {
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axiosInstance.defaults.headers.common['Authorization'];
  }
};

// Authentication APIs
export const login = (credentials) => axiosInstance.post('/auth/login', credentials);
export const register = (userData) => axiosInstance.post('/auth/register', userData);

// CRUD Operations for Courses
export const getCourses = () => axiosInstance.get('/courses');
export const addCourse = (courseData) => axiosInstance.post('/courses', courseData);
export const updateCourse = (id, courseData) => axiosInstance.put(`/courses/${id}`, courseData);
export const deleteCourse = (id) => axiosInstance.delete(`/courses/${id}`);

// Export Axios instance in case you need it for advanced use cases
export default axiosInstance;
