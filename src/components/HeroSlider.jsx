


import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./HeroSlider.css";

function HeroSlider({ slides }) {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();

  const nextSlide = () => setIndex((prev) => (prev + 1) % slides.length);
  const prevSlide = () =>
    setIndex((prev) => (prev - 1 + slides.length) % slides.length);

  useEffect(() => {
    const timer = setInterval(nextSlide, 7000);
    return () => clearInterval(timer);
  }, [index]);

  const current = slides[index];

  const openGame = () => {
    navigate(`/game/${current.id}`);
  };

  return (
    <div className="heroSlider">
      <div className="slide fade"> {/* Fade Animation */}

        {/* GENRE TAGS */}
        <div className="genreTags">
          {current.genre.map((g, i) => (
            <span key={i} className="genreTag">{g}</span>
          ))}
        </div>

        {/* IMAGE */}
        <img className="heroImg" src={current.img} alt={current.title} onClick={openGame}/>

        {/* SHADOW */}
        <div className="heroShadow"></div>

        {/* TEXT + BUTTON */}
        <div className="heroInfo">
          <div className="heroText" onClick={openGame}>
            <h2>{current.title}</h2>
            <p>{current.text}</p>
          </div>

          <button className="heroPrice" onClick={openGame}>
            Buy Now | {current.prize}
          </button>
        </div>

        {/* BUTTONS */}
        <button className="prevBtn" onClick={prevSlide}>❮</button>
        <button className="nextBtn" onClick={nextSlide}>❯</button>
      </div>
    </div>
  );
}

export default HeroSlider;

