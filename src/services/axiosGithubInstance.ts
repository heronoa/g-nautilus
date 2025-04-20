import { C } from "@/utils";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: C.githubApiUrl,
  headers: {
    "Content-Type": "application/json",
    ...(C.githubApiToken && { Authorization: `token ${C.githubApiToken}` }),
  },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
