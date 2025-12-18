import { useEffect, useState } from "react";
import { fetchNewGames } from "../../api/games";
import GameSection from "../Home/GameSection";

export default function NewGames() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNewGames(5)
      .then((res) => {
        const formatted = res.data.map((game) => ({
          id: game.id,
          title: game.name,
          img: game.img,
          description: game.description,
          price: `$${game.price}`,
          genre: game.genres.map((g) => g.name),
        }));

        setGames(formatted);
      })
      .catch((err) => {
        console.error("Failed to fetch new games", err);
        setGames([]);
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
