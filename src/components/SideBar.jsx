

// import { NavLink } from "react-router-dom";
// import { useState } from "react";

// import LoginModal from "../components/Auth/LoginModel";
// import RegisterModal from "../components/Auth/RegisterModel";
// import "./Sidebar.css";

// const sidebarItems = [
//   { label: "Home", link: "/", icon: "fa-solid fa-house" },
//   { label: "Games", link: "/games", icon: "fas fa-gamepad" },
//   { label: "Wishlist", link: "/wishlist", icon: "fa-solid fa-heart" },
//   { label: "Purchases", link: "/buys", icon: "fa-solid fa-bag-shopping" },
//   { label: "Dashboard", link: "/dashboard", icon: "fas fa-gamepad" },
// ];

// export default function Sidebar() {
//   const [showLogin, setShowLogin] = useState(false);
//   const [showRegister, setShowRegister] = useState(false);

//   return (
//     <>
//       <aside className="sidebar">

      
//         <div className="sidebar-header">
//           <h1 className="logo">G<span>Store</span></h1>
//         </div>

       
//         <nav className="sidebar-nav">
//           <ul>
//             {sidebarItems.map((item, index) => (
//               <li key={index}>
//                 <NavLink
//                   to={item.link}
//                   className={({ isActive }) =>
//                     isActive ? "nav-link active" : "nav-link"
//                   }
//                 >
//                   <i className={item.icon}></i>
//                   <span>{item.label}</span>
//                 </NavLink>
//               </li>
//             ))}
//           </ul>
//         </nav>

       
//         <div className="auth-actions">
//           <button className="login-btn" onClick={() => setShowLogin(true)}>
//             Login
//           </button>
//           <button className="register-btn" onClick={() => setShowRegister(true)}>
//             Register
//           </button>
//         </div>
//       </aside>

      
//       {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
//       {showRegister && <RegisterModal onClose={() => setShowRegister(false)} />}
//     </>
//   );
// }


import { NavLink } from "react-router-dom";
import { useState } from "react";

import LoginModal from "../components/Auth/LoginModel";
import RegisterModal from "../components/Auth/RegisterModel";
import "./Sidebar.css";

const sidebarItems = [
  { label: "Home", link: "/", icon: "fa-solid fa-house" },
  { label: "Games", link: "/games", icon: "fas fa-gamepad" },
  { label: "Wishlist", link: "/wishlist", icon: "fa-solid fa-heart" },
  { label: "Purchases", link: "/buys", icon: "fa-solid fa-bag-shopping" },
  { label: "Dashboard", link: "/dashboard", icon: "fas fa-gamepad" },
];

export default function Sidebar() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  // NEW: user state
  const [user, setUser] = useState(null); // e.g., { name: "John Doe" }

  const handleLogout = () => {
    setUser(null);
    // TODO: call API logout or clear token
  };

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    setShowLogin(false);
  };

  const handleRegisterSuccess = (userData) => {
    setUser(userData);
    setShowRegister(false);
  };

  return (
    <>
      <aside className="sidebar">
        {/* Logo */}
        <div className="sidebar-header">
          <h1 className="logo">G<span>Store</span></h1>
        </div>

        {/* Navigation */}
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

        {/* Auth Buttons / Profile */}
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
              <span>👤 {user.name}</span>
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* Modals */}
      {/* {showLogin && <LoginModal onClose={() => setShowLogin(false)} onSuccess={handleLoginSuccess} />}
      {showRegister && <RegisterModal onClose={() => setShowRegister(false)} onSuccess={handleRegisterSuccess} />} */}


      {showLogin && (
  <LoginModal
    onClose={() => setShowLogin(false)}
    onSuccess={handleLoginSuccess} // <-- pass user info back
  />
)}
{showRegister && (
  <RegisterModal
    onClose={() => setShowRegister(false)}
    onSuccess={handleRegisterSuccess} // <-- pass user info back
  />
)}

    </>
  );
}
