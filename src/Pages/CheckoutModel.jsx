import React, { useEffect, useState } from "react";
import api from "../services/axios";
import "./Checkout.css";

export default function CheckoutModal({ gameId, onClose }) {
  const [game, setGame] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    api
      .get(`/games/${gameId}`)
      .then((res) => setGame(res.data))
      .catch(() => setError("Failed to load game"));
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

        <h1 className="checkoutTitle">Secure Checkout</h1>

        <div className="gameSummary">
          <img src={game.img} alt={game.name} />
          <div>
            <h2>{game.name}</h2>
            <p className="price">${game.price}</p>
          </div>
        </div>

        <div className="paymentForm">
          <label>Card Number</label>
          <input value="4242 4242 4242 4242" disabled />

          <div className="row">
            <div>
              <label>Expiry</label>
              <input value="12/29" disabled />
            </div>
            <div>
              <label>CVC</label>
              <input value="123" disabled />
            </div>
          </div>

          {error && <p className="errorText">{error}</p>}

          <button
            className="payBtn"
            onClick={handlePayment}
            disabled={processing}
          >
            {processing ? "Processing..." : `Pay $${game.price}`}
          </button>
        </div>

        <p className="disclaimer">
          Demo checkout — no real payment is processed.
        </p>
      </div>
    </div>
  );
}
