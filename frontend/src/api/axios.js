import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.MODE === "production" ? "/api" : "http://localhost:5001/api",
    withCredentials: true,
});

export default api;
