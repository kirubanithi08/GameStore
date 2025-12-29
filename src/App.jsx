import { Route, Routes } from "react-router-dom";
import SideBar from "./Layout/SideBar";

// Pages
import Home from "./Routes/Home";
import Games from "./Routes/Games";
import Buys from "./Routes/Buys";
import WishList from "./Routes/WishList";
import Dashboard from "./Routes/Dashboard";
import GameDetails from "./Pages/GameDetails";
import Cart from "./Routes/Cart"
import PaymentSuccess from "./Pages/PaymentSuccess";
import WelcomePopup from "./Layout/WelcomePopup";

import PrivateRoute from "./Router/PrivateRoute";

function App() {
  return (
    <div className="app">

<WelcomePopup/>

      <SideBar />

      <Routes>
       
        <Route path="/" element={<Home />} />
        <Route path="/games" element={<Games />} />
        <Route path="/game/:id" element={<GameDetails />} />

       
        <Route
          path="/buys"
          element={
            <PrivateRoute roles={["ROLE_USER", "ROLE_ADMIN"]}>
              <Buys />
            </PrivateRoute>
          }
        />

        <Route
          path="/wishlist"
          element={
            <PrivateRoute roles={["ROLE_USER", "ROLE_ADMIN"]}>
              <WishList />
            </PrivateRoute>
          }
        />

        <Route
          path="/cart"
          element={
            <PrivateRoute roles={["ROLE_USER", "ROLE_ADMIN"]}>
              <Cart />
            </PrivateRoute>
          }
        />

       
        <Route
          path="/dashboard"
          element={
            <PrivateRoute roles={["ROLE_ADMIN"]}>
              <Dashboard />
            </PrivateRoute>
          }
        />


<Route path="/payment-success" element={<PaymentSuccess />} />


      </Routes>
    </div>
  );
}

export default App;
