import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { addToCart, addToWishlist, removeFromCart, removeFromWishlist, checkCartExists, checkWishlistExists, checkPurchaseExists } from "../services/games";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import "./GameCard.css";
import placeholder from "../assets/placeholder.jpg";
import LoginModal from "./Auth/LoginModel";

const FALLBACK_IMG = placeholder;

export default function GameCard({ game }) {
  const { user } = useAuth();
  const { addToast } = useToast();
  const [showLogin, setShowLogin] = useState(false);

  const [inCart, setInCart] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isPurchased, setIsPurchased] = useState(false);

  const [loading, setLoading] = useState(false);

  if (!game) return null;

  const {
    id,
    title,
    img,
    price,
    genre = [],
  } = game;

  useEffect(() => {
    const checkStatus = async () => {
      if (!user) return;
      try {
        const [cartRes, wishlistRes, purchaseRes] = await Promise.all([
          checkCartExists(id),
          checkWishlistExists(id),
          checkPurchaseExists(id)
        ]);
        setInCart(cartRes === true);
        setIsWishlisted(wishlistRes === true);
        setIsPurchased(purchaseRes === true);
      } catch (err) {
        console.error("Status check failed:", err);
      }
    };
    checkStatus();
  }, [user, id]);

  const handleCart = async (e) => {
    e.preventDefault(); e.stopPropagation();
    if (!user) return setShowLogin(true);
    if (isPurchased) return;

    setLoading(true);
    try {
      if (inCart) {
        await removeFromCart(id);
        setInCart(false);
        addToast("Removed from cart");
      } else {
        await addToCart(id);
        setInCart(true);
        addToast("Added to cart");
      }
    } catch {
      addToast("Failed to update cart", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleWishlist = async (e) => {
    e.preventDefault(); e.stopPropagation();
    if (!user) return setShowLogin(true);

    try {
      if (isWishlisted) {
        await removeFromWishlist(id);
        setIsWishlisted(false);
        addToast("Removed from wishlist");
      } else {
        await addToWishlist(id);
        setIsWishlisted(true);
        addToast("Added to wishlist");
      }
    } catch {
      addToast("Failed to update wishlist", "error");
    }
  };

  return (
    <>
      <Link
        to={`/game/${id}`}
        className="modernGameCard"
        aria-label={`View details for ${title}`}
      >
        <button
          className={`card-wishlist-btn ${isWishlisted ? "active" : ""}`}
          onClick={handleWishlist}
          title="Add to wishlist"
        >
          {isWishlisted ? "❤️" : "🤍"}
        </button>

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

          <div className="card-actions">
            <span className="card-price">{price}</span>
            <button
              className={`card-cart-btn ${inCart ? "active" : ""}`}
              onClick={handleCart}
              disabled={loading || isPurchased}
            >
              {isPurchased ? "Owned" : inCart ? "In Cart" : "🛒 +"}
            </button>
          </div>
        </div>
      </Link>

      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
    </>
  );
}

