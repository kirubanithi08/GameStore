
import api from "./axios";


export const fetchFeaturedGames = () => api.get("/games/featured");


export const fetchTrendingGames = (limit = 5) => api.get(`/games/trending?limit=${limit}`);


export const fetchNewGames = (limit = 4) => api.get(`/games/new?limit=${limit}`);


export const searchGames = (query) => api.get(`/games/search?query=${query}`);

export const fetchGamesPaginated = (page = 0, size = 12) =>
  api.get(`/games?page=${page}&size=${size}`);

export const fetchWishlist =()=>api.get(`favorites`)