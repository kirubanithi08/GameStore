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

  const [wishlisted, setWishlisted] = useState(false);
  const [wishlistLoading, setWishlistLoading] = useState(false);

  const [showForm, setShowForm] = useState(false);
  const [adminLoading, setAdminLoading] = useState(false);

  // ---------------------------------------------------
  // LOAD USER ONLY IF TOKEN EXISTS
  // ---------------------------------------------------
  useEffect(() => {
    const token =
      localStorage.getItem("jwt") ||
      localStorage.getItem("token") ||
      localStorage.getItem("accessToken");

    if (!token) {
      setUser(null);
      return;
    }

    fetchMe()
      .then((res) => setUser(res.data))
      .catch(() => setUser(null));
  }, []);

  const isAdmin = user?.role === "ROLE_ADMIN";

  // ---------------------------------------------------
  // LOAD GAME (PUBLIC ENDPOINT)
  // ---------------------------------------------------
  useEffect(() => {
    async function loadGame() {
      try {
        const res = await fetch(`https://game-store-6uwt.onrender.com/api/games/${id}`);
        const data = await res.json();

        setGame({
          id: data.id,
          name: data.name,
          img: data.img,
          cover: data.cover,
          description: data.description,
          genres: data.genres,
          price: data.price,
          featured: data.featured,
        });
      } catch (err) {
        console.error("Failed to load game:", err);
      } finally {
        setLoading(false);
      }
    }

    loadGame();
  }, [id]);

  // ---------------------------------------------------
  // CHECK IF GAME IS ALREADY IN WISHLIST
  // ---------------------------------------------------
  useEffect(() => {
    if (!user || !game) return;

    async function checkFavorite() {
      try {
        const res = await api.get(`/favorites/exists/${game.id}`);
        setWishlisted(res.data === true);
      } catch (err) {
        console.error("Failed to check wishlist", err);
      }
    }

    checkFavorite();
  }, [user, game]);

  // ---------------------------------------------------
  // TOGGLE WISHLIST
  // ---------------------------------------------------
  const toggleWishlist = async () => {
    if (!user) return alert("Please login to use Wishlist.");

    setWishlistLoading(true);

    try {
      if (wishlisted) {
        await api.delete(`/favorites/${game.id}`);
        setWishlisted(false);
      } else {
        await api.post(`/favorites/${game.id}`);
        setWishlisted(true);
      }
    } catch (err) {
      console.error("Wishlist toggle error:", err);
    } finally {
      setWishlistLoading(false);
    }
  };

  // ---------------------------------------------------
  // ADMIN DELETE GAME
  // ---------------------------------------------------
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this game?")) return;

    setAdminLoading(true);

    try {
      await api.delete(`/games/${game.id}`);
      alert("Game deleted successfully!");
      navigate("/admin/dashboard");
    } catch (err) {
      console.error(err);
      alert("Failed to delete game.");
    } finally {
      setAdminLoading(false);
    }
  };

  // ---------------------------------------------------
  // LOADING OR NOT FOUND
  // ---------------------------------------------------
  if (loading) return <SkeletonGameDetails />;
  if (!game) return <div className="notFound">Game Not Found</div>;

  return (
    <div className="gameDetailsPage">
      {/* Banner */}
      <div
        className="gameBanner"
        style={{ backgroundImage: `url(${game.cover})` }}
      >
        <div className="bannerFade"></div>
      </div>

      {/* Main Content */}
      <div className="gameMainContent">
        {/* LEFT */}
        <div className="coverCard">
          <img src={game.img} alt={game.name} />
        </div>

        {/* RIGHT */}
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

            <button
              className={`wishlistIcon ${wishlisted ? "wishlisted" : ""}`}
              onClick={toggleWishlist}
              disabled={wishlistLoading}
            >
              {wishlisted ? "❤️" : "🤍"}
            </button>
          </div>

          {/* ADMIN ACTIONS */}
          {isAdmin && (
            <div className="adminActions">
              <button
                className="adminBtn"
                onClick={() => setShowForm(true)}
                disabled={adminLoading}
              >
                Edit
              </button>

              <button
                className="adminBtn"
                onClick={handleDelete}
                disabled={adminLoading}
              >
                {adminLoading ? "Deleting..." : "Delete"}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Admin Edit Form */}
      {showForm && (
        <GameForm
          game={game}
          onClose={() => {
            setShowForm(false);

            // refresh game data after editing
            setLoading(true);
            api
              .get(`/games/${game.id}`)
              .then((res) => {
                const data = res.data;
                setGame({
                  id: data.id,
                  name: data.name,
                  img: data.img,
                  cover: data.cover,
                  description: data.description,
                  genres: data.genres,
                  price: data.price,
                  featured: data.featured,
                });
              })
              .finally(() => setLoading(false));
          }}
        />
      )}
    </div>
  );
}

/* Skeleton Loader */
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
