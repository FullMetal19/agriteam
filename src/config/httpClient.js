import axios from "axios";

const url = process.env.REACT_APP_API_URL || "http://localhost:5000";


// It's for all request that don't need to be authenticated first
export const apiClient = (contentType) => {
  const axiosInstance =  axios.create({
      baseURL: url,
      headers: { "Content-Type": contentType },
  });

  return axiosInstance;
}


// Authentication is required in order to benefit to this instance for all HTTP method 
export const apiClientAuth = (contentType) => {

    // const headers = (contentType !== "multipart/form-data") ? { "Content-Type": contentType } : {}; 

    const headers = {};
    if (contentType !== "multipart/form-data") { headers["Content-Type"] = contentType; }


    const axiosInstance = axios.create({ baseURL: url, headers });

    // Here is our interceptor which gonna check all request that require authentication first
    axiosInstance.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("token");
        if (token) config.headers.Authorization = `Bearer ${token}`;
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Here is our interceptor that gonna use for answring
    axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        console.error("API Error:", error);
        return Promise.reject(error);
      }
    );

    return axiosInstance;
}
