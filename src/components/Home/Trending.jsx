

import { useEffect, useState } from "react";
import { fetchTrendingGames } from "../../services/games";
import GameSection from "../GameSection";

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

  return (
    <GameSection
      title="New Releases"
      games={games}
      loading={loading}
      showArrow={true}
    />
  );
}
