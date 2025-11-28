import { useEffect, useState } from "react";
import { fetchGamesPaginated } from "../../api/games"; // you create this function
import GameCard from "../Games/GameCard";
import "./GamePage.css";

export default function GamesPage() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [size] = useState(12);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    loadGames();
  }, [page]);

  const loadGames = () => {
    setLoading(true);

    fetchGamesPaginated(page, size)
      .then((res) => {
        const formatted = res.data.content.map((game) => ({
          id: game.id,
          title: game.name,
          img: game.img,
          description: game.description,
          prize: `$${game.price}`,
          genre: game.genres.map((g) => g.name),
        }));

        setGames(formatted);
        setTotalPages(res.data.totalPages);
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="gamesPage">
      <h1>All Games</h1>

      {loading ? (
        <p className="loading">Loading games...</p>
      ) : (
        <div className="gamesGrid">
          {games.map((g) => (
            <GameCard key={g.id} game={g} />
          ))}
        </div>
      )}

      <div className="pagination">
        <button disabled={page === 0} onClick={() => setPage(page - 1)}>
          Previous
        </button>

        <span>
          Page {page + 1} / {totalPages}
        </span>

        <button
          disabled={page >= totalPages - 1}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
