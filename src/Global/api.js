import axios from "axios";
import Cookies from "js-cookie";

const baseUrl = import.meta.env.VITE_BASE_URL

const axiosInstance = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "multiple/form-data",
  },
});

// Function to get the latest token
export const getToken = () => {
  return Cookies.get("token");
};

// console.log(getToken())
// Update the headers before each request with the latest token
axiosInstance.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${getToken()}`;
  return config;
});

export const get = (url) => {
  return axiosInstance.get(url);
};

export const post = (url, data) => {
  return axiosInstance.post(url, data);
};

export const isPublish = (url, id) => {
  return axiosInstance.post(url, { data: { id } });
};

export const patch = (url, data) => {
  return axiosInstance.patch(url, data);
};

// export const del = (url, id) => {
//   return axiosInstance.delete(url, { data: { id } });
// };
