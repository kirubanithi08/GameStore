

// import React from 'react';
// import "./Hero.css";
// import Search from '../components/Search';
// import HeroSlider from '../components/HeroSlider';
// import { gameData } from '../Data/GameData';

// function Hero() {
//   return (
//     <div className='hero'>
//       <HeroSlider slides={gameData} />

//       <Search />
//     </div>
//   );
// }

// export default Hero;



// src/components/Hero.js
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
        // Map backend response to the format HeroSlider expects
        const formatted = res.data.map(game => ({
          id: game.id,
          title: game.name,
          text: game.description,
          img: game.imgUrl,
          genre: game.genres.map(g => g.name),
          prize: `$${game.prize}`
        }));
        setSlides(formatted);
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

