

import { useEffect, useState } from "react";
import { fetchTrendingGames } from "../../services/games";
import GameSection from "../GameSection";

export default function Trending() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTrending = async () => {
      try {
        const data = await fetchTrendingGames(5);
        if (!data || !Array.isArray(data)) {
          setGames([]);
          return;
        }
        const formatted = data.map(game => ({
          id: game.id,
          title: game.name,
          img: game.img,
          description: game.description,
          price: game.price ? `$${game.price}` : "Free",
          genre: game.genres?.map(g => g.name) || []
        }));
        setGames(formatted);
      } catch (err) {
        console.error("Trending Error:", err);
        setGames([]);
      } finally {
        setLoading(false);
      }
    };
    loadTrending();
  }, []);

  return (
    <GameSection
      title="Trending"
      games={games}
      loading={loading}
      showArrow={true}
    />
  );
}
