

import { useEffect, useState } from "react";
import { fetchTrendingGames } from "../../api/games";
import GameSection from "../Home/GameSection";

export default function Trending() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTrendingGames(5) 
      .then((res) => {
       
        const formatted = res.data.map(game => ({
          id: game.id,
          title: game.name,
          img: game.img,
          description: game.description,
          price: `$${game.price}`,
          genre: game.genres.map(g => g.name)
        }));
        setGames(formatted);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="loading">Loading Trending Games...</p>;

  return <GameSection title="Trending Now" games={games} showArrow={false} />;
}
