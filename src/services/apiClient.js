import axios from "axios";

const apiClient = axios.create({
    baseURL:
        import.meta.env.VITE_API_BASE_URL ||
        "https://game-store-6uwt.onrender.com/api",
    timeout: 30000,
    headers: { "Content-Type": "application/json" },
});


apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem("accessToken");

    if (
        token &&
        token !== "null" &&
        token !== "undefined" &&
        token.length > 20 &&
        !config.url.includes("/auth/refresh")
    ) {
        config.headers.Authorization = `Bearer ${token}`;
    } else {
        delete config.headers.Authorization;
    }

    return config;
});


let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
    failedQueue.forEach((p) => (error ? p.reject(error) : p.resolve(token)));
    failedQueue = [];
};


apiClient.interceptors.response.use(
    (response) => response,

    async (error) => {
        const originalRequest = error.config;
        const token = localStorage.getItem("accessToken");

        if (!token) return Promise.reject(error);

        if (error.response?.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                }).then((newToken) => {
                    originalRequest.headers.Authorization = `Bearer ${newToken}`;
                    return apiClient(originalRequest);
                });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                const refreshRes = await apiClient.post("/auth/refresh");
                const newToken = refreshRes.data.data.accessToken;

                localStorage.setItem("accessToken", newToken);

                processQueue(null, newToken);

                originalRequest.headers.Authorization = `Bearer ${newToken}`;
                return apiClient(originalRequest);
            } catch (err) {
                processQueue(err, null);
                localStorage.removeItem("accessToken");
                return Promise.reject(err);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
);

export default apiClient;