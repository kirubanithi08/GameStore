import { NavLink } from "react-router-dom";
import { useState } from "react";

import LoginModal from "../components/Auth/LoginModel";
import RegisterModal from "../components/Auth/RegisterModel";
import { useAuth } from "../Context/AuthContext";
import "./Sidebar.css";

const sidebarItems = [
  { label: "Home", link: "/", icon: "fa-solid fa-house" },
  { label: "Games", link: "/games", icon: "fas fa-gamepad" },
  { label: "Wishlist", link: "/wishlist", icon: "fa-solid fa-heart" },
  { label: "Purchases", link: "/buys", icon: "fa-solid fa-bag-shopping" },
  { label: "Dashboard", link: "/dashboard", icon: "fas fa-gamepad" },
];

export default function Sidebar() {
  const { user, logout } = useAuth(); // <-- GLOBAL AUTH
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  return (
    <>
      <aside className="sidebar">
        <div className="sidebar-header">
          <h1 className="logo">G<span>Store</span></h1>
        </div>

        <nav className="sidebar-nav">
          <ul>
            {sidebarItems.map((item, index) => (
              <li key={index}>
                <NavLink
                  to={item.link}
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                >
                  <i className={item.icon}></i>
                  <span>{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="auth-actions">
          {!user ? (
            <>
              <button className="login-btn" onClick={() => setShowLogin(true)}>
                Login
              </button>
              <button className="register-btn" onClick={() => setShowRegister(true)}>
                Register
              </button>
            </>
          ) : (
            <div className="profile-box">
              <span>👤 {user.username}</span>
              <button className="logout-btn" onClick={logout}>
                Logout
              </button>
            </div>
          )}
        </div>
      </aside>

      {showLogin && (
        <LoginModal onClose={() => setShowLogin(false)} />
      )}

      {showRegister && (
        <RegisterModal onClose={() => setShowRegister(false)} />
      )}
    </>
  );
}
