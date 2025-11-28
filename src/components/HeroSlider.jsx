import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./HeroSlider.css";

function HeroSlider({ slides = [] }) {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();

  
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
    if (!slides.length) return; 
    const timer = setInterval(nextSlide, 7000);
    return () => clearInterval(timer);
  }, [index, slides]);

  const openGame = () => {
    if (current.id) navigate(`/game/${current.id}`);
  };

  return (
    <div className="heroSlider">
      <div className="slide fade">
       
        <div className="genreTags">
          {current.genre?.map((g, i) => (
            <span key={i} className="genreTag">{g}</span>
          ))}
        </div>

       
        {current.img && (
          <img className="heroImg" src={current.img} alt={current.title} onClick={openGame} />
        )}

       
        <div className="heroShadow"></div>

       
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
