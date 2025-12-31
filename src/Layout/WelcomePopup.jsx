import { useEffect, useState } from "react";
import "./WelcomePopup.css";

export default function WelcomePopup() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true); 
  }, []);

  const closePopup = () => {
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="popup-overlay">
      <div className="popup">
        <h2>👋 Welcome!</h2>
        <h1>
          My free Render server can take 1–2 minutes to wake up. If the website
          seems slow, please refresh the page.
        </h1>
        <br />
        <p>
          Welcome to our game store 🎮! Browse games, add them to your cart, and
          have fun!
        </p>
        <button onClick={closePopup}>Got it</button>
      </div>
    </div>
  );
}
