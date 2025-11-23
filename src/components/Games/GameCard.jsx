
import { useNavigate } from "react-router-dom";
import "./Games.css";

export default function GameCard({ game }) {
  const navigate = useNavigate();

  return (
    <div className="gameCard" onClick={() => navigate(`/game/${game.id}`)}>
      
      <img src={game.img} alt={game.title} className="gameImg" />

      
      <div className="gameInfo">
        <h3>{game.title}</h3>

        
        <div className="genres">
          {game.genre.map((g, i) => (
            <span key={i} className="genreTag">{g}</span>
          ))}
        </div>

        <p>{game.description}</p>
      </div>

      
      <div className="gameBottom">
        <span className="price">{game.prize}</span>
        <button className="buyBtn">Buy</button>
      </div>
    </div>
  );
}
