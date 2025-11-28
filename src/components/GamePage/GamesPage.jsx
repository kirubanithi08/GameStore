import { useEffect, useState } from "react";
import { fetchGamesPaginated, searchGames } from "../../api/games";

import GameCard from "../Games/GameCard";
import SearchBar from "./SearchBar";
import "./GamePage.css";

export default function GamesPage() {
  const [games, setGames] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const size = 12;
  const [totalPages, setTotalPages] = useState(0);

  const [genre, setGenre] = useState("ALL");

 
  useEffect(() => {
    if (!searchQuery.trim()) loadGames();
  }, [page]);

  const loadGames = () => {
    setLoading(true);
    fetchGamesPaginated(page, size)
      .then((res) => {
        const formatted = res.data.content.map((g) => ({
          id: g.id,
          title: g.name,
          img: g.img,
          description: g.description,
          prize: `$${g.price}`,
          genre: g.genres.map((x) => x.name),
        }));

        setGames(formatted);
        setTotalPages(res.data.totalPages);
      })
      .finally(() => setLoading(false));
  };

  
  const handleSearch = async (text) => {
    setSearchQuery(text);

    if (!text.trim()) {
      setSearchResults([]);
      return;
    }

    setLoading(true);
    try {
      const res = await searchGames(text);
      const formatted = res.data.map((g) => ({
        id: g.id,
        title: g.name,
        img: g.img,
        description: g.description,
        prize: `$${g.price}`,
        genre: g.genres.map((x) => x.name),
      }));
      setSearchResults(formatted);
    } finally {
      setLoading(false);
    }
  };

 
  const listToShow = (searchQuery ? searchResults : games).filter(
    (g) => genre === "ALL" || g.genre.includes(genre)
  );

  return (
    <div className="gamesPage">
      <h1>All Games</h1>

      {/* Search + Genre in same row */}
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
            // <GamePageCard key={g.id} game={g} />
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
