import { useEffect, useState } from 'react'
import { fetchWishlist } from "../api/games";
import GameCard from "../components/Games/GameCard";
import "./Wishlist.css"
function WishlistPage() {

const [games, setGames] = useState([]);

  useEffect(() => {
    fetchWishlist().then((res) => setGames(res.data));
  }, []);

  return (
    <div className='wishlist'>
        <h1>Wishlist</h1>

          <div className="wishgames">
                {games.map((g) => (
                  <GameCard key={g.id} game={g} />
                ))}
              </div>
    </div>
  )
}

export default WishlistPage