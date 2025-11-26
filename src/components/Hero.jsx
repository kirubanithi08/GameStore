import React, { useEffect, useState } from "react";
import "./Hero.css";
import Search from './Search';
import HeroSlider from "./HeroSlider";
import { fetchFeaturedGames } from "../api/games";

function Hero() {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedGames()
      .then((res) => {
        if (!res.data || !Array.isArray(res.data)) return;

        const formatted = res.data.map(game => ({
          id: game.id || "",
          title: game.name || "Untitled Game",
          text: game.description || "",
          img: game.img || "",
          genre: Array.isArray(game.genres) ? game.genres.map(g => g.name) : [],
          prize: game.price != null ? `$${game.price}` : "N/A",
        }));

        setSlides(formatted);
      })
      .catch((err) => {
        console.error("Error fetching featured games:", err);
        setSlides([]);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="loading">Loading featured games...</p>;

  return (
    <div className='hero'>
      <HeroSlider slides={slides} />
      <Search />
    </div>
  );
}

export default Hero;
