import { Link } from "react-router-dom";
import "./GamePageCard.css";

export default function GamePageCard({ game }) {
  return (
    <Link to={`/game/${game.id}`} className="gameCard">
      <div className="gameImg">
        <img src={game.img} alt={game.title} />
      </div>

      <div className="gameInfo">
        <h3>{game.title}</h3>

        <div className="genres">
          {game.genre.map((g, i) => (
            <span key={i} className="genreTag">
              {g}
            </span>
          ))}
        </div>

        <p className="price">{game.prize}</p>
      </div>
    </Link>
  );
}
