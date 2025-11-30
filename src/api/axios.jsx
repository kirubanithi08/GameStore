import axios from "axios";

const api = axios.create({
  baseURL: "https://game-store-6uwt.onrender.com/api",
  withCredentials: true,
  timeout: 50000,
});

// Attach Access Token BEFORE every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");

  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }

  console.log("REQUEST TOKEN:", config.headers["Authorization"]);

  return config;
});


let isRefreshing = false;
let queue = [];

// Handle pending requests while refreshing token
const resolveQueue = (error, token = null) => {
  queue.forEach((p) => (error ? p.reject(error) : p.resolve(token)));
  queue = [];
};

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;

    // Handle 401 (expired token)
    if (error.response?.status === 401 && !original._retry) {
      original._retry = true;

      if (!isRefreshing) {
        isRefreshing = true;

        try {
          const { data } = await api.post("/auth/refresh");
          const newToken = data.accessToken;

          // Save new token
          localStorage.setItem("accessToken", newToken);

          // FIX HERE — correct way to set default headers
          api.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;

          console.log("NEW TOKEN SET:", newToken);

          resolveQueue(null, newToken);
        } catch (err) {
          resolveQueue(err);
          localStorage.removeItem("accessToken");
          return Promise.reject(err);
        } finally {
          isRefreshing = false;
        }
      }

      return new Promise((resolve, reject) => {
        queue.push({
          resolve: (token) => {
            original.headers.Authorization = `Bearer ${token}`;
            resolve(api(original));
          },
          reject,
        });
      });
    }

    return Promise.reject(error);
  }
);

export default api;
