import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./GameDetails.css";

function GameDetails() {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchGame() {
      try {
        const res = await fetch(`https://your-backend.com/api/games/${id}`);
        const data = await res.json();
        setGame(data);
      } catch (err) {
        console.error("Error loading game:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchGame();
  }, [id]);

  if (loading) return <div className="loading">Loading…</div>;
  if (!game) return <div className="notFound">Game Not Found</div>;

  return (
    <div className="gameDetails">

      {/* Background Banner */}
      <div
        className="gameBanner"
        style={{ backgroundImage: `url(${game.cover})` }}
      >
        <div className="bannerOverlay"></div>
      </div>

      {/* Game Info Panel */}
      <div className="gameContent">
        
        <div className="leftCover">
          <img src={game.cover} alt={game.title} />
        </div>

        <div className="rightInfo">
          <h1 className="gameTitle">{game.title}</h1>

          <div className="genres">
            {game.genre?.map((g, i) => (
              <span key={i}>{g}</span>
            ))}
          </div>

          <p className="description">{game.description}</p>

          <div className="bottomRow">
            <h2 className="price">${game.price}</h2>

            <button className="buyBtn">Buy Now</button>
            <button className="wishBtn">❤️ Wishlist</button>
          </div>
        </div>
      </div>

      {/* Screenshots Section */}
      {game.screenshots?.length > 0 && (
        <div className="screenshotsSection">
          <h2>Screenshots</h2>

          <div className="screenshots">
            {game.screenshots.map((shot, i) => (
              <img key={i} src={shot} alt={`screenshot ${i}`} />
            ))}
          </div>
        </div>
      )}

    </div>
  );
}

export default GameDetails;
