import { useEffect, useState } from "react";
import { searchGames } from "../services/games";
import { useAuth } from "../context/AuthContext";
import LoginModel from "./Auth/LoginModel";

import GameCard from "./GameCard";
import SearchBar from "./SearchBar";
import GameCardSkeleton from "./Skeletons/GameCardSkeleton";

import "./GamePage.css";

const PAGE_SIZE = 10;

export default function GamePageComponent({ sectionName, fetchGames }) {
  const { user, loading: authLoading } = useAuth();
  const [showLogin, setShowLogin] = useState(false);

  const [games, setGames] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const [genre, setGenre] = useState("ALL");



  const formatGame = (item) => {
    const g = item.game || item;

    return {
      id: g.id,
      title: g.name,
      img: g.img,
      cover: g.cover,
      description: g.description,
      price: `$${g.price}`,
      // genre: g.genres?.map((x) => x.name) ?? [],
      genre: g.genres?.map(x => typeof x === "string" ? x : x.name) ?? [],

      wishlisted: !!item.game,
    };
  };




  const isPublicSection =
    sectionName?.toLowerCase().includes("all") ||
    sectionName?.toLowerCase().includes("game") ||
    sectionName?.toLowerCase().includes("home") ||
    sectionName?.toLowerCase().includes("search");

  useEffect(() => {
    if (isPublicSection || user) {
      loadGames();
    } else {
      setLoading(false);
    }
  }, [page, searchQuery, user, sectionName]);

  const loadGames = async () => {
    setLoading(true);
    try {
      const data = await fetchGames(page, PAGE_SIZE);


      const rawData = data?.content || data?.data?.content || data?.data || data;
      const content = Array.isArray(rawData) ? rawData : [];
      const totalPagesVal = data?.totalPages || data?.data?.totalPages || 1;

      if (content.length === 0) {
        console.warn(`GamePageComponent: No games found for section "${sectionName}". Public: ${isPublicSection}, User: ${!!user}`);
      }

      setGames(content.map(formatGame));
      setTotalPages(totalPagesVal);
    } catch (err) {
      console.error(`GamePageComponent: Failed to load ${sectionName}:`, err);
      setGames([]);
    } finally {
      setLoading(false);
    }
  };



  const handleSearch = async (text) => {
    setSearchQuery(text);
    setPage(0);

    if (!text.trim()) {
      setSearchResults([]);
      return;
    }

    setLoading(true);
    try {
      const data = await searchGames(text);
      const content = data?.content ?? data?.data ?? data ?? [];
      setSearchResults((Array.isArray(content) ? content : []).map(formatGame));
    } catch (err) {
      console.error("Search failed", err);
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };


  const listToShow = (searchQuery ? searchResults : games).filter(
    (g) => genre === "ALL" || g.genre.includes(genre)
  );



  if (authLoading) return <div className="gamesPage"><h1>{sectionName}</h1><div className="loader">Loading...</div></div>;

  return (
    <div className="gamesPage">
      <h1>{sectionName}</h1>

      {!user && !isPublicSection ? (
        <div className="auth-placeholder">
          <p>Please login to view your {sectionName.toLowerCase()}.</p>
          <button className="login-btn-placeholder" onClick={() => setShowLogin(true)}>
            Login to Account
          </button>
        </div>
      ) : (
        <>
          <div className="topControls">
            <SearchBar onSearch={handleSearch} />

            <select
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              className="genre-select"
            >
              <option value="ALL">All Genres</option>
              <option value="Action">Action</option>
              <option value="Adventure">Adventure</option>
              <option value="RPG">RPG</option>
              <option value="Shooter">Shooter</option>
            </select>
          </div>

          <div className="gamesGrid">
            {loading
              ? Array.from({ length: PAGE_SIZE }).map((_, i) => (
                <GameCardSkeleton key={i} />
              ))
              : listToShow.length > 0
                ? listToShow.map((g) => <GameCard key={g.id} game={g} />)
                : (
                  <div className="empty-placeholder">
                    <p>No games found in this section.</p>
                  </div>
                )}
          </div>

          {!searchQuery && !loading && games.length > 0 && (
            <div className="pagination">
              <button disabled={page === 0} onClick={() => setPage((p) => p - 1)}>
                {"<"}
              </button>

              <span>
                {page + 1} / {totalPages}
              </span>

              <button
                disabled={page >= totalPages - 1}
                onClick={() => setPage((p) => p + 1)}
              >
                {">"}
              </button>
            </div>
          )}
        </>
      )}

      {showLogin && <LoginModel onClose={() => setShowLogin(false)} />}
    </div>
  );
}
