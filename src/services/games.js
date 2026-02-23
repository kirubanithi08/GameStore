import api from "./apiClient";

const getPayload = (res) => res?.data;


export const fetchGenres = async () => {
    const res = await api.get("/genres");
    // return getPayload(res);
    return res.data.data;
};

export const fetchFeaturedGames = async () => {
    const res = await api.get("/games/featured");
    return getPayload(res.data);
};

export const fetchTrendingGames = async (limit = 5) => {
    const res = await api.get(`/games/trending?limit=${limit}`);
    return getPayload(res.data);
};

export const fetchNewGames = async (limit = 4) => {
    const res = await api.get(`/games/new?limit=${limit}`);
    return getPayload(res.data);
};

export const searchGames = async (query) => {
    const res = await api.get(`/games/search?query=${query}`);

    console.log("api res:", res.data.data);
    return getPayload(res.data);
};


export const fetchGames = async (page = 0, size = 10) => {
    const res = await api.get(`/games?page=${page}&size=${size}`);

    return res.data.data;
};

export const fetchGameById = async (id) => {
    const res = await api.get(`/games/${id}`);
    return getPayload(res.data);
};

export const deleteGame = async (id) => {
    const res = await api.delete(`/games/${id}`);
    return getPayload(res.data);
};


export const fetchWishlist = async (page = 0, size = 10) => {
    const res = await api.get(`/favorites?page=${page}&size=${size}`);
    // return getPayload(res);
    return res.data.data.content;
};

export const fetchCart = async (page = 0, size = 12) => {
    const res = await api.get(`/cart?page=${page}&size=${size}`);
    // return getPayload(res.data);

    return res.data.data.content;
};

export const fetchBuys = async (page = 0, size = 12) => {
    const res = await api.get(`/purchase?page=${page}&size=${size}`);
    // return getPayload(res.data);

    return res.data.data.content;
};


export const addToCart = async (id) => {
    const res = await api.post(`/cart/${id}`);
    return getPayload(res.data);
};

export const removeFromCart = async (id) => {
    const res = await api.delete(`/cart/${id}`);
    return getPayload(res.data);
};

export const checkCartExists = async (id) => {
    const res = await api.get(`/cart/exists/${id}`);
    return getPayload(res.data);
};

export const addToWishlist = async (id) => {
    const res = await api.post(`/favorites/${id}`);
    return getPayload(res.data);
};

export const removeFromWishlist = async (id) => {
    const res = await api.delete(`/favorites/${id}`);
    return getPayload(res.data);
};

export const checkWishlistExists = async (id) => {
    const res = await api.get(`/favorites/exists/${id}`);
    console.log();
    return getPayload(res.data);
};

export const checkPurchaseExists = async (id) => {
    const res = await api.get(`/purchase/exists/${id}`);
    return getPayload(res.data);
};