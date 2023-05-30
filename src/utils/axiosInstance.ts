import axios from "axios";
import { API_URL, USER_KEY } from "../constants";

const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = error?.config;
    console.log(config.sent);
    if (error?.response?.status === 401 && !config?.sent) {
      config.sent = true;
      try {
        await axios.get(`${API_URL}/auth/refresh/`, {
          withCredentials: true,
        });
        return axiosInstance(config);
      } catch (err) {
        localStorage.removeItem(USER_KEY);
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
