import axios from "axios";


const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || "https://game-store-6uwt.onrender.com/api",
    timeout: 30000, 
    headers: {
        "Content-Type": "application/json",
    },
});


apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("accessToken");

       
        if (token && token.length > 10 && token !== "null" && token !== "undefined" && !config.url.includes("/auth/refresh")) {
            config.headers["Authorization"] = `Bearer ${token}`;
        } else {
            
            delete config.headers["Authorization"];
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
    failedQueue.forEach((prom) => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });
    failedQueue = [];
};


apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        
        if (error.response?.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                })
                    .then((token) => {
                        originalRequest.headers["Authorization"] = "Bearer " + token;
                        return apiClient(originalRequest);
                    })
                    .catch((err) => {
                        return Promise.reject(err);
                    });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                const { data } = await apiClient.post("/auth/refresh");
                const newToken = data?.data?.accessToken;

                if (newToken) {
                    localStorage.setItem("accessToken", newToken);
                    apiClient.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
                    processQueue(null, newToken);
                    originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
                    return apiClient(originalRequest);
                }
            } catch (refreshError) {
                processQueue(refreshError, null);
                localStorage.removeItem("accessToken");
                
                return Promise.reject(refreshError);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
);

export default apiClient;
