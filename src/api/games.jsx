
import api from "./axios";


export const fetchFeaturedGames = () => api.get("/games/featured");


export const fetchTrendingGames = (limit = 10) => api.get(`/games/trending?limit=${limit}`);


export const fetchNewGames = (limit = 10) => api.get(`/games/new?limit=${limit}`);


export const searchGames = (query) => api.get(`/games/search?query=${query}`);
