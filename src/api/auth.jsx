import api from "./axios";

export const login = (data) => api.post("/login", data);
export const registerUser = (data) => api.post("/register", data);
export const logout = () => api.post("/logout");
