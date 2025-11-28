import { useNavigate } from "react-router-dom";
import GameCard from "../Games/GameCard";
import "../Home/Games.css";

export default function GameSection({ title, games, showArrow }) {
  const navigate = useNavigate();

  return (
    <div className="gameSection">

      <div className="sectionHeader">
        <h2>{title}</h2>

        {showArrow && (
          <button
            className="goBtn"
            onClick={() => navigate("/games")}
          >
            ❯
          </button>
        )}
      </div>

      <div className="gameGrid">
        {games.slice(0, 6).map((g) => (
          <GameCard key={g.id} game={g} />
        ))}
      </div>
    </div>
  );
}
