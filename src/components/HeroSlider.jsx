import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./HeroSlider.css";

function HeroSlider({ slides = [] }) {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();

  // Safely get current slide
  const current = slides[index] || {
    id: "",
    title: "",
    text: "",
    img: "",
    genre: [],
    prize: "N/A",
  };

  const nextSlide = () => setIndex((prev) => (slides.length ? (prev + 1) % slides.length : 0));
  const prevSlide = () => setIndex((prev) => (slides.length ? (prev - 1 + slides.length) % slides.length : 0));

  useEffect(() => {
    if (!slides.length) return; // no slides, skip timer
    const timer = setInterval(nextSlide, 7000);
    return () => clearInterval(timer);
  }, [index, slides]);

  const openGame = () => {
    if (current.id) navigate(`/game/${current.id}`);
  };

  return (
    <div className="heroSlider">
      <div className="slide fade">
        {/* Genre Tags */}
        <div className="genreTags">
          {current.genre?.map((g, i) => (
            <span key={i} className="genreTag">{g}</span>
          ))}
        </div>

        {/* Hero Image */}
        {current.img && (
          <img className="heroImg" src={current.img} alt={current.title} onClick={openGame} />
        )}

        {/* Shadow */}
        <div className="heroShadow"></div>

        {/* Hero Info */}
        <div className="heroInfo">
          <div className="heroText" onClick={openGame}>
            <h2>{current.title}</h2>
            <p>{current.text}</p>
          </div>

          {current.prize && (
            <button className="heroPrice" onClick={openGame}>
              Buy Now | {current.prize}
            </button>
          )}
        </div>

        {/* Navigation Buttons */}
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
