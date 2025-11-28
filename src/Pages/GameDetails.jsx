import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./GameDetails.css";

export default function GameDetails() {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchGame() {
      try {
        const res = await fetch(`https://game-store-6uwt.onrender.com/api/games/${id}`);
        const data = await res.json();

        setGame({
          id: data.id,
          title: data.name,
          img: data.img,
          cover: data.img,
          description: data.description,
          genre: data.genres?.map(g => g.name),
          price: data.price,
          screenshots: data.screenshots
        });
      } catch (err) {
        console.error("Error loading game:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchGame();
  }, [id]);

  if (loading) return <SkeletonGameDetails />;

  if (!game) return <div className="notFound">Game Not Found</div>;

  return (
    <div className="gameDetailsPage">

      {/* Banner */}
      <div className="gameBanner" style={{ backgroundImage: `url(${game.img})` }}>
        <div className="bannerFade"></div>
      </div>

      {/* Content */}
      <div className="gameMainContent">

        {/* Left: Cover */}
        <div className="coverCard">
          <img src={game.cover} alt={game.title} />
        </div>

        {/* Right: Game Info */}
        <div className="infoPanel">
          <h1 className="title">{game.title}</h1>

          <div className="genreList">
            {game.genre?.map((g, i) => (
              <span key={i}>{g}</span>
            ))}
          </div>

          <p className="description">{game.description}</p>

          <div className="purchaseRow">
            <button className="priceBtn">Buy — ${game.price}</button>
            <button className="wishlistBtn">❤️ Wishlist</button>
          </div>
        </div>
      </div>

      {/* Screenshots */}
      {/* {game.screenshots?.length > 0 && (
        <div className="screenshotsSection">
          <h2>Screenshots</h2>
          <div className="screenshots">
            {game.screenshots.map((shot, i) => (
              <img key={i} src={shot} alt={`Screenshot ${i + 1}`} />
            ))}
          </div>
        </div>
      )} */}
    </div>
  );
}

/* -------------------------
   ⭐ Skeleton Loader
-------------------------- */
function SkeletonGameDetails() {
  return (
    <div className="gameDetailsPage">
      <div className="gameBanner skeleton"></div>

      <div className="gameMainContent">
        <div className="coverCard skeletonBox"></div>

        <div className="infoPanel">
          <div className="skeletonText titleSkeleton"></div>
          <div className="skeletonText shortSkeleton"></div>
          <div className="skeletonText longSkeleton"></div>
          <div className="skeletonBtn"></div>
        </div>
      </div>
    </div>
  );
}
