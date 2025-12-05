import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios"; 
import { fetchMe } from "../api/auth";
import GameForm from "../components/Dashboard/GameForm"; 
import "./GameDetails.css";

export default function GameDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null); 
  const [adminLoading, setAdminLoading] = useState(false);
  const [showForm, setShowForm] = useState(false); 

  useEffect(() => {
    fetchMe()
      .then(res => setUser(res.data))
      .catch(() => setUser(null)); 
  }, []);

  useEffect(() => {
    async function fetchGame() {
      try {
        const res = await fetch(`https://game-store-6uwt.onrender.com/api/games/${id}`);
        const data = await res.json();
        setGame({
          id: data.id,
          name: data.name,
          img: data.img,
          cover: data.img,
          description: data.description,
          genres: data.genres,
          price: data.price,
          screenshots: data.screenshots,
          featured: data.featured
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

  const isAdmin = user?.role === "ROLE_ADMIN";

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this game?")) return;
    setAdminLoading(true);
    try {
      await api.delete(`/games/${game.id}`);
      alert("Game deleted successfully!");
      navigate("/admin/dashboard");
    } catch (err) {
      console.error(err);
      alert("Failed to delete the game.");
    } finally {
      setAdminLoading(false);
    }
  };

  return (
    <div className="gameDetailsPage">

      {/* Banner */}
      <div className="gameBanner" style={{ backgroundImage: `url(${game.cover})` }}>
        <div className="bannerFade"></div>
      </div>

      {/* Content */}
      <div className="gameMainContent">

        {/* Left: Cover */}
        <div className="coverCard">
          <img src={game.img} alt={game.name} />
        </div>

        {/* Right: Game Info */}
        <div className="infoPanel">
          <h1 className="title">{game.name}</h1>

          <div className="genreList">
            {game.genres?.map((g, i) => (
              <span key={i}>{g.name}</span>
            ))}
          </div>

          <p className="description">{game.description}</p>

          <div className="purchaseRow">
            <button className="priceBtn">Buy — ${game.price}</button>
            <button className="wishlistBtn">❤️ Wishlist</button>
          </div>

          
          {isAdmin && (
            <div className="adminActions">
              <button className="adminBtn" onClick={() => setShowForm(true)} disabled={adminLoading}>
                Edit
              </button>
              <button className="adminBtn" onClick={handleDelete} disabled={adminLoading}>
                {adminLoading ? "Deleting..." : "Delete"}
              </button>
            </div>
          )}
        </div>
      </div>

      
      {showForm && (
        <GameForm
          game={game}
          onClose={() => {
            setShowForm(false);
            
            setLoading(true);
            api.get(`/games/${game.id}`).then(res => {
              const data = res.data;
              setGame({
                id: data.id,
                name: data.name,
                img: data.img,
                cover: data.img,
                description: data.description,
                genres: data.genres,
                price: data.price,
                screenshots: data.screenshots,
                featured: data.featured
              });
            }).finally(() => setLoading(false));
          }}
        />
      )}
    </div>
  );
}

/*Skeleton Loader*/
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
