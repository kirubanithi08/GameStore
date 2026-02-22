import api from "./apiClient";

const extractData = (res) => res?.data || res;

export const fetchGenres = async () => {
    const response = await api.get("/genres");
    return extractData(response.data);
};

export const fetchFeaturedGames = async () => {
    const response = await api.get("/games/featured");
    return extractData(response.data);
};

export const fetchTrendingGames = async (limit = 5) => {
    const response = await api.get(`/games/trending?limit=${limit}`);
    return extractData(response.data);
};

export const fetchNewGames = async (limit = 4) => {
    const response = await api.get(`/games/new?limit=${limit}`);
    return extractData(response.data);
};

export const searchGames = async (query) => {
    const response = await api.get(`/games/search?query=${query}`);
    return extractData(response.data);
};

export const fetchGames = async (page = 0, size = 12) => {
    const response = await api.get(`/games?page=${page}&size=${size}`);
    return extractData(response.data);
};

export const fetchGameById = async (id) => {
    const response = await api.get(`/games/${id}`);
    return extractData(response.data);
};

export const deleteGame = async (id) => {
    const response = await api.delete(`/games/${id}`);
    return extractData(response.data);
};

export const fetchWishlist = async (page = 0, size = 12) => {
    const response = await api.get(`/favorites?page=${page}&size=${size}`);
    return extractData(response.data);
};

export const fetchCart = async (page = 0, size = 12) => {
    const response = await api.get(`/cart?page=${page}&size=${size}`);
    return extractData(response.data);
};

// Cart & Wishlist Actions
export const addToCart = async (id) => {
    const response = await api.post(`/cart/${id}`);
    return extractData(response.data);
};

export const removeFromCart = async (id) => {
    const response = await api.delete(`/cart/${id}`);
    return extractData(response.data);
};

export const checkCartExists = async (id) => {
    const response = await api.get(`/cart/exists/${id}`);
    return extractData(response.data);
};

export const addToWishlist = async (id) => {
    const response = await api.post(`/favorites/${id}`);
    return extractData(response.data);
};

export const removeFromWishlist = async (id) => {
    const response = await api.delete(`/favorites/${id}`);
    return extractData(response.data);
};

export const checkWishlistExists = async (id) => {
    const response = await api.get(`/favorites/exists/${id}`);
    return extractData(response.data);
};

export const checkPurchaseExists = async (id) => {
    const response = await api.get(`/purchase/exists/${id}`);
    return extractData(response.data);
};

export const fetchBuys = async (page = 0, size = 12) => {
    const response = await api.get(`/purchase?page=${page}&size=${size}`);
    return extractData(response.data);
};
