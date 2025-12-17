
import { NavLink } from "react-router-dom";
import { useState } from "react";

import LoginModal from "../components/Auth/LoginModel";
import RegisterModal from "../components/Auth/RegisterModel";
import { useAuth } from "../Context/AuthContext";
import "./Sidebar.css";

export default function Sidebar() {
  const { user, logout } = useAuth();
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  return (
    <>
      <aside className="sidebar">
        <div className="sidebar-header">
          <h1 className="logo">
            G<span>Store</span>
          </h1>
        </div>

        <nav className="sidebar-nav">
          <ul>
           
            <li>
              <NavLink to="/" className="nav-link">
                <i className="fa-solid fa-house"></i>
                Home
              </NavLink>
            </li>

            <li>
              <NavLink to="/games" className="nav-link">
                <i className="fas fa-gamepad"></i>
                Games
              </NavLink>
            </li>

           
            {user && (
              <>
                <li>
                  <NavLink to="/wishlist" className="nav-link">
                    <i className="fa-solid fa-heart"></i>
                    Wishlist
                  </NavLink>
                </li>

                <li>
                  <NavLink to="/cart" className="nav-link">
                    <i className="fa-solid fa-cart"></i>
                    Cart
                  </NavLink>
                </li>

                <li>
                  <NavLink to="/buys" className="nav-link">
                    <i className="fa-solid fa-bag-shopping"></i>
                    Purchases
                  </NavLink>
                </li>
              </>
            )}

            
            {user?.role === "ROLE_ADMIN" && (
              <li>
                <NavLink to="/dashboard" className="nav-link">
                  <i className="fas fa-user-shield"></i>
                  Dashboard
                </NavLink>
              </li>
            )}
          </ul>
        </nav>

        <div className="auth-actions">
          {!user ? (
            <>
              <button className="login-btn" onClick={() => setShowLogin(true)}>
                Login
              </button>
              <button
                className="register-btn"
                onClick={() => setShowRegister(true)}
              >
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

      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
      {showRegister && <RegisterModal onClose={() => setShowRegister(false)} />}
    </>
  );
}
