import { useNavigate } from "react-router-dom";
import GameCard from "./GameCard";
import GameCardSkeleton from "./Skeletons/GameCardSkeleton";
import "./Games.css";

const PAGE_SIZE = 5;

export default function GameSection({
  title,
  games = [],
  loading = false,
  showArrow = false,
}) {
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
        {loading
          ? Array.from({ length: PAGE_SIZE }).map((_, i) => (
              <GameCardSkeleton key={i} />
            ))
          : games.map((g) => (
              <GameCard key={g.id} game={g} />
            ))}
      </div>
    </div>
  );
}
