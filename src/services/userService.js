import api from "./apiClient";

export const fetchUsers = async () => {
    const response = await api.get("/user");
  
    const extractedData = response.data?.data?.content || response.data?.data || response.data?.content || response.data || [];
    return Array.isArray(extractedData) ? extractedData : [];
};

export const deleteUser = async (id) => {
    const response = await api.delete(`/user/${id}`);
    return response.data;
};

export const updateUserRole = async (id, role) => {
    const response = await api.put(`/user/${id}/role`, { role });
    return response.data;
};
