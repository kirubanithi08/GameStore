import { useEffect, useState } from "react";
import { searchGames } from "../../api/games";

import GameCard from "../Games/GameCard";
import SearchBar from "../GamePage/SearchBar";
import GameCardSkeleton from "../Skeletons/GameCardSkeleton";

import "../GamePage/GamePage.css";

const PAGE_SIZE = 12;

export default function GamePageComponent({ sectionName, fetchGames }) {
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
      genre: g.genres?.map((x) => x.name) ?? [],
      wishlisted: !!item.game,
    };
  };

  

  useEffect(() => {
    if (!searchQuery.trim()) {
      loadGames();
    }
  }, [page, searchQuery]);

  const loadGames = async () => {
    setLoading(true);
    try {
      const res = await fetchGames(page, PAGE_SIZE);
      const data = res.data;

      const content = data?.content ?? data ?? [];
      setGames(content.map(formatGame));
      setTotalPages(data?.totalPages ?? 1);
    } catch (err) {
      console.error("Failed to load games", err);
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
      const res = await searchGames(text);
      setSearchResults((res.data ?? []).map(formatGame));
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

  

  return (
    <div className="gamesPage">
      <h1>{sectionName}</h1>

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
          : listToShow.map((g) => <GameCard key={g.id} game={g} />)}
      </div>

      {!searchQuery && !loading && (
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
    </div>
  );
}
