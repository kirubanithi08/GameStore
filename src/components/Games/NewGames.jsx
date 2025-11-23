

import { useEffect, useState } from "react";
import { fetchNewGames } from "../../api/games";
import GameSection from "./GameSection";

export default function NewGames() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNewGames(6) 
      .then((res) => {
        const formatted = res.data.map(game => ({
          id: game.id,
          title: game.name,
          img: game.imgUrl,
          description: game.description,
          prize: `$${game.prize}`,
          genre: game.genres.map(g => g.name)
        }));
        setGames(formatted);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="loading">Loading New Games...</p>;

  return <GameSection title="New Releases" games={games} showArrow={true} />;
}
