import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000/api",
});

instance.interceptors.request.use((config) => {
  const stored = localStorage.getItem("user");
  const token = stored ? JSON.parse(stored).token : null;

  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default instance;
