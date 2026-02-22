import api from "./apiClient";


const extractData = (res) => res?.data || res;

export const loginUser = async (data) => {
    const response = await api.post("/auth/login", data);
    return extractData(response.data);
};

export const registerUser = async (data) => {
    const response = await api.post("/auth/register", data);
    return extractData(response.data);
};

export const fetchMe = async () => {
    const response = await api.get("/auth/me");
    return extractData(response.data);
};
