import axios from "axios";

const defaultAPI = axios.create({
  baseURL: "https://renter-api.ksbgarage.com",
});

// Add a request interceptor
defaultAPI.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    config.headers.Locale = `${localStorage.getItem("lang")}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default defaultAPI;
