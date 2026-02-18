import { Link } from "react-router-dom";
import "./GameCard.css";
import placeholder from "../assets/placeholder.jpg";


const FALLBACK_IMG = placeholder;

export default function GameCard({ game }) {
  if (!game) return null;

  const {
    id,
    title,
    img,
    price,
    genre = [],
    wishlisted,
  } = game;

  return (
    <Link
      to={`/game/${id}`}
      className="modernGameCard"
      aria-label={`View details for ${title}`}
    >

      {wishlisted && <div className="wishlistBadge">❤️</div>}

      <div className="mgc-img">
        <img
          src={img || FALLBACK_IMG}
          alt={title || "Game cover"}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src = FALLBACK_IMG;
          }}
        />
      </div>

      <div className="mgc-info">
        <h3 title={title}>{title}</h3>

        <div className="mgc-tags">
          {genre.slice(0, 2).map((g) => (
            <span className="mgc-tag" key={g}>
              {g}
            </span>
          ))}
        </div>


        <div className="mgc-buyBtn">
          Buy — {price}
        </div>
      </div>
    </Link>
  );
}
