import React, { useEffect, useState } from "react";
import api from "../services/apiClient";
import "./Checkout.css";

export default function CheckoutModal({ gameId, onClose }) {
  const [game, setGame] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGame = async () => {
      try {
        const res = await api.get(`/games/${gameId}`);
        setGame(res.data);
      } catch (err) {
        setError("Failed to load game");
      }
    };
    fetchGame();
  }, [gameId]);

  const handlePayment = async () => {
    setProcessing(true);
    setError(null);

    try {

      await new Promise((resolve) => setTimeout(resolve, 2000));


      await api.post(`/purchases/${gameId}`);

      alert("Payment successful! Game added to your library 🎮");
      onClose();
    } catch (err) {
      console.error(err);
      setError("Payment failed. Please try again.");
    } finally {
      setProcessing(false);
    }
  };

  if (!game) return null;

  return (
    <div className="checkoutOverlay" onClick={onClose}>
      <div
        className="checkoutModal"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="closeBtn" onClick={onClose}>✕</button>

        <div className="checkoutHeader">
          <h1 className="checkoutTitle">Complete Your Purchase</h1>
          <p className="checkoutSubtitle">Secure & Instant Delivery</p>
        </div>

        <div className="checkoutBody">
          <div className="gameSummary">
            <div className="summaryImage">
              <img src={game.img} alt={game.name} />
            </div>
            <div className="summaryText">
              <h2>{game.name}</h2>
              <span className="gameCategory">Digital Edition</span>
            </div>
            <div className="summaryPrice">
              <span className="priceLabel">Total</span>
              <p className="priceValue">${game.price}</p>
            </div>
          </div>

          <div className="paymentSection">
            <div className="inputGroup">
              <label>Card Number</label>
              <div className="inputWrapper">
                <span className="inputIcon">💳</span>
                <input value="•••• •••• •••• 4242" disabled />
              </div>
            </div>

            <div className="inputRow">
              <div className="inputGroup">
                <label>Expiry</label>
                <input value="12 / 29" disabled />
              </div>
              <div className="inputGroup">
                <label>CVC</label>
                <input value="•••" disabled />
              </div>
            </div>

            {error && <div className="errorBadge">{error}</div>}

            <button
              className="payBtn"
              onClick={handlePayment}
              disabled={processing}
            >
              {processing ? (
                <span className="loader">Processing...</span>
              ) : (
                <>Place Order — ${game.price}</>
              )}
            </button>
          </div>
        </div>

        <div className="checkoutFooter">
          <p className="secureNote">🔒 SSL Secured Checkout</p>
          <p className="disclaimer">Demo environment — no actual charges will be made.</p>
        </div>
      </div>
    </div>
  );
}
