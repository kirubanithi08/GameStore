import { Link } from "react-router-dom";
import "./GameCard.css";

export default function GameCard({ game }) {
  return (
    <Link to={`/game/${game.id}`} className="modernGameCard">
      
      {/* Wishlist Badge */}
      {game.wishlisted && (
        <div className="wishlistBadge">❤️</div>
      )}

      <div className="mgc-img">
        <img src={game.img} alt={game.title} />
      </div>

      <div className="mgc-info">
        <h3>{game.title}</h3>

        <div className="mgc-tags">
          {game.genre.slice(0, 2).map((g, i) => (
            <span className="mgc-tag" key={i}>
              {g}
            </span>
          ))}
        </div>

        <button className="mgc-buyBtn">
          Buy — {game.price}
        </button>
      </div>
    </Link>
  );
}
