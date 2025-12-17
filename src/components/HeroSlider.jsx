import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./HeroSlider.css";

function HeroSlider({ slides = [], loading = false }) {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();

  /* ---------------- Skeleton ---------------- */
  if (loading) {
    return <HeroSliderSkeleton />;
  }

  const current = slides[index] || {
    id: "",
    title: "",
    text: "",
    cover: "",
    genre: [],
    price: "",
  };

  const nextSlide = () =>
    setIndex((prev) => (slides.length ? (prev + 1) % slides.length : 0));

  const prevSlide = () =>
    setIndex((prev) =>
      slides.length ? (prev - 1 + slides.length) % slides.length : 0
    );

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
        {/* Genre Tags */}
        <div className="genreTags">
          {current.genre?.map((g) => (
            <span key={g} className="genreTag">{g}</span>
          ))}
        </div>

        {/* Image */}
        {current.cover && (
          <img
            className="heroImg"
            src={current.cover}
            alt={current.title}
            onClick={openGame}
          />
        )}

        {/* Shadow */}
        <div className="heroShadow"></div>

        {/* Info */}
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

        {/* Controls */}
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

/* ---------------- Skeleton Component ---------------- */

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

export default HeroSlider;
