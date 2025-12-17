import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./PaymentSuccess.css";

export default function PaymentSuccess() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state?.game) {
    return <div>Invalid access</div>;
  }

  return (
    <div className="successPage">
      <div className="successCard">
        <h1>🎉 Payment Successful</h1>
        <p>You now own</p>
        <h2>{state.game.name}</h2>

        <img src={state.game.img} alt={state.game.name} />

        <button onClick={() => navigate("/")}>Back to Store</button>
      </div>
    </div>
  );
}
