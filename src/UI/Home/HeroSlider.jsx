import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./HeroSlider.css";

function HeroSlider({ slides = [] }) {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();

  if (!slides.length) return null;

  const current = slides[index];

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(nextSlide, 7000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const openGame = () => {
    if (current.id) navigate(`/game/${current.id}`);
  };

  return (
    <div className="heroSlider">
      <div className="slide fade">

        <div className="genreTags">
          {current.genre.map((g) => (
            <span key={g} className="genreTag">
              {g}
            </span>
          ))}
        </div>

        {current.cover && (
          <img
            src={current.cover}
            alt={current.title}
            className="heroImg"
            onClick={openGame}
          />
        )}

        <div className="heroShadow" />

        <div className="heroInfo">
          <div className="heroText" onClick={openGame}>
            <h2>{current.title}</h2>
            <p>{current.text}</p>
          </div>

          {current.price && (
            <button className="heroPrice" onClick={openGame}>
              Buy Now | {current.price}
            </button>
          )}
        </div>

        {slides.length > 1 && (
          <>
            <button className="prevBtn" onClick={prevSlide}>❮</button>
            <button className="nextBtn" onClick={nextSlide}>❯</button>
          </>
        )}
      </div>
    </div>
  );
}

export default HeroSlider;
