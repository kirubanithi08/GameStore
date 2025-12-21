import React, { useEffect, useState } from "react";
import "./Hero.css";
import Search from "./Search";
import HeroSlider from "./HeroSlider";
import { fetchFeaturedGames } from "../../api/games";

function Hero() {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedGames()
      .then((res) => {
        if (!res.data || !Array.isArray(res.data)) return;

        const formatted = res.data.map((game) => ({
          id: game.id,
          title: game.name,
          text: game.description,
          cover: game.cover,
          genre: game.genres?.map((g) => g.name) || [],
          price: game.price != null ? `$${game.price}` : null,
        }));

        setSlides(formatted);
      })
      .catch(() => setSlides([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="hero">
      {loading ? <HeroSliderSkeleton /> : <HeroSlider slides={slides} />}
      <Search />
    </div>
  );
}

/* ===== Slider Skeleton Component ===== */
function HeroSliderSkeleton() {
  return (
    <div className="heroSlider skeleton-hero">
      <div className="heroSkeletonImg" />

      <div className="heroSkeletonTags">
        <span />
        <span />
        <span />
      </div>

      <div className="heroShadow" />

      <div className="heroSkeletonInfo">
        <div className="heroSkeletonText">
          <div className="heroSkeletonTitle" />
          <div className="heroSkeletonDesc" />
        </div>

        <div className="heroSkeletonBtn" />
      </div>
    </div>
  );
}

export default Hero;
