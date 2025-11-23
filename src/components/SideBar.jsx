// import "./SideBarStyle.css";
// import { NavLink } from "react-router-dom";
// import { useState } from "react";

// import LoginModal from "../components/Auth/LoginModel";
// import RegisterModal from "../components/Auth/RegisterModel";

// const sidebarItems = [
//   { label: "Home", link: "/", icon: "fa-solid fa-house" },
//   { label: "Games", link: "/Games", icon: "fas fa-gamepad" },
//   { label: "Wishlist", link: "/wishList", icon: "fa-solid fa-heart" },
//   { label: "Buys", link: "/buys", icon: "fa-solid fa-bag-shopping" }
// ];

// function SideBar() {
//   const [showLogin, setShowLogin] = useState(false);
//   const [showRegister, setShowRegister] = useState(false);

//   return (
//     <div className="sidebar">

      
//       <div className="top-section">
        
//         <h1>
//           G-<span>Store</span>:
//         </h1>

//         <nav className="navbar">
//           <ul>
//             {sidebarItems.map((item, index) => (
//               <li className="items" key={index}>
//                 <NavLink to={item.link} className="link">
//                   <i className={item.icon}></i>
//                   {item.label}
//                 </NavLink>
//               </li>
//             ))}
//           </ul>
//         </nav>
//       </div>

      
//       <div className="auth-buttons">
//         <div className="loginBtn" onClick={() => setShowLogin(true)}>
//           Login
//         </div>
//         <div className="registerBtn" onClick={() => setShowRegister(true)}>
//           Register
//         </div>
//       </div>

     
//       {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
//       {showRegister && <RegisterModal onClose={() => setShowRegister(false)} />}
//     </div>
//   );
// }

// export default SideBar;








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
];

export default function Sidebar() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

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

        {/* Auth Buttons */}
        <div className="auth-actions">
          <button className="login-btn" onClick={() => setShowLogin(true)}>
            Login
          </button>
          <button className="register-btn" onClick={() => setShowRegister(true)}>
            Register
          </button>
        </div>
      </aside>

      {/* Modals */}
      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
      {showRegister && <RegisterModal onClose={() => setShowRegister(false)} />}
    </>
  );
}
