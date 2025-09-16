import axios from "axios";

const url = process.env.REACT_APP_API_URL || "http://localhost:5000";

// Requêtes sans cookie
export const apiClient = (contentType) => {
  return axios.create({
    baseURL: url,
    headers: { "Content-Type": contentType }
  });
};

// Requêtes avec cookie de session
export const apiClientAuth = (contentType) => {
  const headers = {};
  if (contentType !== "multipart/form-data") {
    headers["Content-Type"] = contentType;
  }

  const axiosInstance = axios.create({
    baseURL: url,
    headers,
    withCredentials: true    // <— pour envoyer le cookie HttpOnly
  });

  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      console.error("API Error:", error);
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};
