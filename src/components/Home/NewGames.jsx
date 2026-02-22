import { useEffect, useState } from "react";
import { fetchNewGames } from "../../services/games";
import GameSection from "../GameSection";

export default function NewGames() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadNewGames = async () => {
      try {
        const data = await fetchNewGames(5);
        if (!data || !Array.isArray(data)) {
          setGames([]);
          return;
        }
        const formatted = data.map((game) => ({
          id: game.id,
          title: game.name,
          img: game.img,
          description: game.description,
          price: game.price ? `$${game.price}` : "Free",
          genre: game.genres?.map((g) => g.name) || [],
        }));
        setGames(formatted);
      } catch (err) {
        console.error("Failed to fetch new games", err);
        setGames([]);
      } finally {
        setLoading(false);
      }
    };
    loadNewGames();
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
