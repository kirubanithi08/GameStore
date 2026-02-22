import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as authService from "../services/auth";
import * as gameService from "../services/games";
import { useToast } from "../context/ToastContext";
import GameForm from "../components/Dashboard/GameForm";
import CheckoutModal from "./CheckoutModel";
import LoginModal from "../components/Auth/LoginModel";
import "./GameDetails.css";

export default function GameDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToast } = useToast();

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

  const loadUserData = useCallback(async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) return;

    try {
      const userData = await authService.fetchMe();
      setUser(userData);
    } catch (err) {
      setUser(null);
    }
  }, []);

  useEffect(() => {
    loadUserData();
  }, [loadUserData]);

  const isAdmin = user?.role === "Admin";

  useEffect(() => {
    const loadGame = async () => {
      try {
        const data = await gameService.fetchGameById(id);
        setGame(data);
      } catch (err) {
        console.error("Failed to load game:", err);
      } finally {
        setLoading(false);
      }
    };
    loadGame();
  }, [id]);

  useEffect(() => {
    const checkStatus = async () => {
      if (!user || !game) return;

      try {
        const [isWishlisted, isPurchased, isInCart] = await Promise.all([
          gameService.checkWishlistExists(game.id),
          gameService.checkPurchaseExists(game.id),
          gameService.checkCartExists(game.id).catch(() => false)
        ]);

        setWishlisted(isWishlisted === true);
        setPurchased(isPurchased === true);
        setInCart(isInCart === true);
      } catch (err) {
        console.error("Status check failed:", err);
      }
    };
    checkStatus();
  }, [user, game]);



  const toggleWishlist = async () => {
    if (!user) return setShowLogin(true);

    setWishlistLoading(true);
    try {
      if (wishlisted) {
        await gameService.removeFromWishlist(game.id);
        setWishlisted(false);
        addToast("Removed from wishlist");
      } else {
        await gameService.addToWishlist(game.id);
        setWishlisted(true);
        addToast("Added to wishlist");
      }
    } catch {
      addToast("Something went wrong", "error");
    } finally {
      setWishlistLoading(false);
    }
  };



  const handleAddToCart = async () => {
    if (!user) return setShowLogin(true);
    if (purchased) return;

    setCartLoading(true);
    try {
      if (inCart) {
        await gameService.removeFromCart(game.id);
        setInCart(false);
        addToast("Removed from cart");
      } else {
        await gameService.addToCart(game.id);
        setInCart(true);
        addToast("Added to cart");
      }
    } catch {
      addToast("Cart action failed", "error");
    } finally {
      setCartLoading(false);
    }
  };



  const handleDelete = async () => {
    if (!window.confirm("Delete this game?")) return;

    setAdminLoading(true);
    try {
      await gameService.deleteGame(game.id);
      addToast("Game deleted");
      navigate("/games");
    } catch {
      addToast("Delete failed", "error");
    } finally {
      setAdminLoading(false);
    }
  };


  if (loading) return <SkeletonGameDetails />;
  if (!game) return <div className="notFound">Game Not Found</div>;

  return (
    <div className="gameDetailsPage">

      <div
        className="gameBanner"
        style={{ backgroundImage: `url(${game.cover})` }}
      >
        <div className="bannerFade"></div>
      </div>


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


            <button
              className={`cartBtn ${inCart ? "active" : ""}`}
              onClick={handleAddToCart}
              disabled={cartLoading || purchased}
              title={purchased ? "Already owned" : inCart ? "Remove from cart" : "Add to cart"}
            >
              {inCart ? "🛒 In Cart" : "🛒 Add to Cart"}
            </button>


            <button
              className={`wishlistBtn ${wishlisted ? "active" : ""}`}
              onClick={toggleWishlist}
              disabled={wishlistLoading}
              title="Wishlist"
            >
              {wishlisted ? "❤️" : "🤍"}
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


/*SKELETON */
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
