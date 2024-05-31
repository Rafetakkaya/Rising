import axios from "axios";

const API_URL = "https://recruitment-api.vercel.app";

const instance = axios.create({
  baseURL: API_URL,
  timeout: 15 * 1000,
});

instance.interceptors.request.use((request) => {
  const accessToken = localStorage.getItem("accessToken");

  if (accessToken) {
    // eslint-disable-next-line no-param-reassign
    request.headers.authorization = accessToken;
  }

  return request;
});

// Add a response interceptor
instance.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(error)
);

export default instance;
