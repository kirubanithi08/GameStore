

import { useEffect, useState } from "react";
import { fetchTrendingGames } from "../../api/games";
import GameSection from "./GameSection";

export default function Trending() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTrendingGames(6) 
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

  if (loading) return <p className="loading">Loading Trending Games...</p>;

  return <GameSection title="Trending Now" games={games} showArrow={false} />;
}
