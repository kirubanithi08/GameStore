import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { fetchMe } from "../api/auth";
import GameForm from "../components/Dashboard/GameForm";
import CheckoutModal from "./CheckoutModel";
import LoginModal from "../components/Auth/LoginModel";
import "./GameDetails.css";

export default function GameDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);

  const [user, setUser] = useState(null);

  const [wishlisted, setWishlisted] = useState(false);
  const [wishlistLoading, setWishlistLoading] = useState(false);

  const [purchased, setPurchased] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);

  const [showForm, setShowForm] = useState(false);
  const [adminLoading, setAdminLoading] = useState(false);

  const [showLogin, setShowLogin] = useState(false);
  const [cartLoading, setCartLoading] = useState(false);

  const [inCart, setInCart] = useState(false);
  const [toast, setToast] = useState(null);

  /* ===============================
     HELPERS
  ================================ */
  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  /* ===============================
     AUTH
  ================================ */
  useEffect(() => {
    const token =
      localStorage.getItem("jwt") ||
      localStorage.getItem("token") ||
      localStorage.getItem("accessToken");

    if (!token) return;

    fetchMe()
      .then((res) => setUser(res.data))
      .catch(() => setUser(null));
  }, []);

  const isAdmin = user?.role === "ROLE_ADMIN";

  /* ===============================
     LOAD GAME
  ================================ */
  useEffect(() => {
    async function loadGame() {
      try {
        const res = await fetch(
          `https://game-store-6uwt.onrender.com/api/games/${id}`
        );
        const data = await res.json();
        setGame(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadGame();
  }, [id]);

  /* ===============================
     WISHLIST & PURCHASE STATUS
  ================================ */
  useEffect(() => {
  if (!user || !game) return;

  api.get(`/favorites/exists/${game.id}`)
    .then((res) => setWishlisted(res.data === true));

  api.get(`/purchase/exists/${game.id}`)
    .then((res) => setPurchased(res.data === true));

  api.get(`/cart/exists/${game.id}`)
    .then((res) => setInCart(res.data === true))
    .catch(() => {});
}, [user, game]);


  /* ===============================
     ACTIONS
  ================================ */
  const toggleWishlist = async () => {
    if (!user) return setShowLogin(true);

    setWishlistLoading(true);
    try {
      if (wishlisted) {
        await api.delete(`/favorites/${game.id}`);
        setWishlisted(false);
        showToast("Removed from wishlist");
      } else {
        await api.post(`/favorites/${game.id}`);
        setWishlisted(true);
        showToast("Added to wishlist");
      }
    } catch {
      showToast("Something went wrong", "error");
    } finally {
      setWishlistLoading(false);
    }
  };

  // const handleAddToCart = async () => {
  //   if (!user) return setShowLogin(true);
  //   if (purchased) return;

  //   setCartLoading(true);
  //   try {
  //     await api.post(`/cart/${game.id}`);
  //     showToast("Added to cart");
  //   } catch {
  //     showToast("Failed to add to cart", "error");
  //   } finally {
  //     setCartLoading(false);
  //   }
  // };


const handleAddToCart = async () => {
  if (!user) return setShowLogin(true);
  if (purchased) return;

  setCartLoading(true);
  try {
    if (inCart) {
      await api.delete(`/cart/${game.id}`);
      setInCart(false);
      showToast("Removed from cart");
    } else {
      await api.post(`/cart/${game.id}`);
      setInCart(true);
      showToast("Added to cart");
    }
  } catch {
    showToast("Cart action failed", "error");
  } finally {
    setCartLoading(false);
  }
};



  const handleDelete = async () => {
    if (!window.confirm("Delete this game?")) return;

    setAdminLoading(true);
    try {
      await api.delete(`/games/${game.id}`);
      showToast("Game deleted");
      navigate("/admin/dashboard");
    } catch {
      showToast("Delete failed", "error");
    } finally {
      setAdminLoading(false);
    }
  };

  
  if (loading) return <SkeletonGameDetails />;
  if (!game) return <div className="notFound">Game Not Found</div>;

  return (
    <div className="gameDetailsPage">
      {/* TOAST */}
      {toast && (
        <div className={`toast ${toast.type}`}>
          {toast.message}
        </div>
      )}

      {/* BANNER */}
      <div
        className="gameBanner"
        style={{ backgroundImage: `url(${game.cover})` }}
      >
        <div className="bannerFade"></div>
      </div>

      {/* CONTENT */}
      <div className="gameMainContent">
        <div className="coverCard">
          <img src={game.img} alt={game.name} />
        </div>

        <div className="infoPanel">
          <h1>{game.name}</h1>

          <div className="genreList">
            {game.genres?.map((g, i) => (
              <span key={i}>{g.name}</span>
            ))}
          </div>

          <p className="description">{game.description}</p>

          <div className="purchaseRow">
            <button
              className="priceBtn"
              disabled={purchased}
              onClick={() => {
                if (!user) return setShowLogin(true);
                setShowCheckout(true);
              }}
            >
              {purchased ? "Owned" : `Buy — $${game.price}`}
            </button>

            {/* <button
              className="cartBtn"
              onClick={handleAddToCart}
              disabled={cartLoading || purchased}
              title={purchased ? "Already owned" : "Add to cart"}
            >
              🛒
            </button> */}

            <button
  className={`cartBtn ${inCart ? "active" : ""}`}
  onClick={handleAddToCart}
  disabled={cartLoading || purchased}
  title={purchased ? "Already owned" : inCart ? "Remove from cart" : "Add to cart"}
>
  {/* {inCart ? "🗑️" : "🛒"} */}
   🛒
</button>


            <button
              className={`wishlistBtn ${wishlisted ? "active" : ""}`}
              onClick={toggleWishlist}
              disabled={wishlistLoading}
              title="Wishlist"
            >
              ♥
            </button>
          </div>

          {isAdmin && (
            <div className="adminActions">
              <button onClick={() => setShowForm(true)} className="adminBtn">Edit</button>
              <button onClick={handleDelete} className="adminBtn">
                {adminLoading ? "Deleting..." : "Delete"}
              </button>
            </div>
          )}
        </div>
      </div>

      {showCheckout && !purchased && (
        <CheckoutModal
          gameId={game.id}
          onClose={() => setShowCheckout(false)}
        />
      )}

      {showForm && (
        <GameForm
          game={game}
          onClose={() => setShowForm(false)}
        />
      )}

      {showLogin && (
        <LoginModal onClose={() => setShowLogin(false)} />
      )}
    </div>
  );
}

/* ===============================
   SKELETON
================================ */
function SkeletonGameDetails() {
  return (
    <div className="gameDetailsPage">
      <div className="gameBanner skeleton"></div>
      <div className="gameMainContent">
        <div className="coverCard skeletonBox"></div>
        <div className="infoPanel">
          <div className="skeletonText titleSkeleton"></div>
          <div className="skeletonText longSkeleton"></div>
          <div className="skeletonBtn"></div>
        </div>
      </div>
    </div>
  );
}
