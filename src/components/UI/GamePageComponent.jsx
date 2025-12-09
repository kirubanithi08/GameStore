import { useEffect, useState } from "react";
import { searchGames } from "../../api/games";

import GameCard from "../Games/GameCard";
import SearchBar from "../GamePage/SearchBar";
import "../GamePage/GamePage.css";

export default function GamePageComponent({
    sectionName,
    fetchGames
}) {
  const [games, setGames] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const size = 12;
  const [totalPages, setTotalPages] = useState(0);

  const [genre, setGenre] = useState("ALL");

  // ---------------------------------------------------
  // LOAD GAMES (OR WISHLIST GAMES)
  // ---------------------------------------------------
  useEffect(() => {
    if (!searchQuery.trim()) loadGames();
  }, [page]);

  const loadGames = () => {
    setLoading(true);

    fetchGames(page, size)
      .then((res) => {
        const data = res.data;

        // Supports both:
        // - Page<Favorite> response → content[].game
        // - Page<Game> response → content[]
        const content = data?.content ?? data ?? [];

        const formatted = content.map((item) => {
          const g = item.game || item; // support both return types

          return {
            id: g.id,
            title: g.name,
            img: g.img,
            cover: g.cover,
            description: g.description,
            price: `$${g.price}`,
            genre: g.genres?.map((x) => x.name) ?? [],
            wishlisted: !!item.game, // true if it's a Favorite
          };
        });

        setGames(formatted);
        setTotalPages(data?.totalPages ?? 1);
      })
      .finally(() => setLoading(false));
  };

  // ---------------------------------------------------
  // SEARCH SYSTEM
  // ---------------------------------------------------
  const handleSearch = async (text) => {
    setSearchQuery(text);

    if (!text.trim()) {
      setSearchResults([]);
      return;
    }

    setLoading(true);
    try {
      const res = await searchGames(text);

      const formatted = (res.data ?? []).map((g) => ({
        id: g.id,
        title: g.name,
        img: g.img,
        cover: g.cover,
        description: g.description,
        price: `$${g.price}`,
        genre: g.genres?.map((x) => x.name) ?? [],
        wishlisted: false,
      }));

      setSearchResults(formatted);
    } finally {
      setLoading(false);
    }
  };

  // ---------------------------------------------------
  // FILTERS
  // ---------------------------------------------------
  const listToShow =
    (searchQuery ? searchResults : games)?.filter(
      (g) => genre === "ALL" || g.genre.includes(genre)
    ) ?? [];

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

      {loading ? (
        <div className="gamesGrid">
          {Array.from({ length: 12 }).map((_, i) => (
            <div className="skeleton-card" key={i}>
              <div className="skeleton-img"></div>
              <div className="skeleton-title"></div>
              <div className="skeleton-line"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="gamesGrid">
          {listToShow.map((g) => (
            <GameCard key={g.id} game={g} />
          ))}
        </div>
      )}

      {!searchQuery && !loading && (
        <div className="pagination">
          <button disabled={page === 0} onClick={() => setPage(page - 1)}>
            {"<"}
          </button>

          <span>
            {page + 1} / {totalPages}
          </span>

          <button
            disabled={page >= totalPages - 1}
            onClick={() => setPage(page + 1)}
          >
            {">"}
          </button>
        </div>
      )}
    </div>
  );
}
