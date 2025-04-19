import { C } from "@/utils";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: C.GITHUB_API_URL,
  headers: {
    "Content-Type": "application/json",
    ...(C.GITHUB_API_TOKEN && { Authorization: `token ${C.GITHUB_API_TOKEN}` }),
  },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
