// src/axiosConfig.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com", // JSON de API de prueba
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;