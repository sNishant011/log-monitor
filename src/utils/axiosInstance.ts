import axios from 'axios';
import { API_URL } from '../constants';

const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.log(error)
    const config = error?.config;
    console.log(error.response.status)
    if (error?.response?.status === 401 && !config?.sent) {
      config.sent = true;
      await axiosInstance.post(`/auth/refresh/`);
      return axiosInstance(config);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
