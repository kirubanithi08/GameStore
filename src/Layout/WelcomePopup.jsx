import { useEffect, useState } from "react";
import "./WelcomePopup.css";

export default function WelcomePopup() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const hasSeenPopup = localStorage.getItem("welcomePopupSeen");

    if (!hasSeenPopup) {
      setShow(true);
    }
  }, []);

  const closePopup = () => {
    localStorage.setItem("welcomePopupSeen", "true");
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="popup-overlay">
      <div className="popup">
        <h2>👋 Welcome!</h2>
        <h1>I use Render deploy free server so it takes 1 to 2 minutes to wake the server, so 
          refresh.
        </h1>
        <br />
        <p>
          Welcome to our game store 🎮  
          Browse games, add them to your cart, and enjoy!
        </p>
        <button onClick={closePopup}>Got it</button>
      </div>
    </div>
  );
}
