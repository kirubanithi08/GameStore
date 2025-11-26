import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { searchGames } from "../api/games";
import "./Search.css";

export default function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  
  useEffect(() => {
    if (query.trim() === "") {
      setResults([]);
      return;
    }

    const delay = setTimeout(() => {
      fetchGames(query);
    }, 300);

    return () => clearTimeout(delay);
  }, [query]);

  const fetchGames = async (text) => {
    try {
      setLoading(true);
      const res = await searchGames(text);
      const formatted = res.data.map(game => ({
        id: game.id,
        title: game.name,
        img: game.img,
        genre: game.genres.map(g => g.name)
      }));
      setResults(formatted);
    } catch (err) {
      console.error("Search error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleNavigate = (id) => {
    navigate(`/game/${id}`);
    setQuery("");      
    setResults([]);    
  };

  return (
    <div className="liveSearchWrap">
      <input
        className="liveInput"
        type="search"
        placeholder="Search games..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      
      {query && results.length > 0 && (
        <div className="searchDropdown">
          {results.map((game) => (
            <div
              key={game.id}
              className="searchItem"
              onClick={() => handleNavigate(game.id)}
            >
              <img src={game.img} alt={game.title} />
              <div>
                <span>{game.title}</span>
                <small>{game.genre.join(", ")}</small>
              </div>
            </div>
          ))}
        </div>
      )}

      
      {query && !loading && results.length === 0 && (
        <div className="searchDropdown noResults">
          No games found
        </div>
      )}
    </div>
  );
}
