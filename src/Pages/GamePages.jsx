import { useEffect, useState } from "react";
import { fetchGames } from "../api/games";
import GameCard from "../components/Games/GameCard";
import "./GamesPage.css";

export default function GamesPage() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    fetchGames().then((res) => setGames(res.data));
  }, []);

  return (
    <div className="gamesPage">
      <h1>All Games</h1>

      <div className="gamesGridFull">
        {games.map((g) => (
          <GameCard key={g.id} game={g} />
        ))}
      </div>
    </div>
  );
}
