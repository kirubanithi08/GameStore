import { Route, Routes } from "react-router-dom";
import SideBar from "./layouts/SideBar";

import Home from "./pages/Home";
import Games from "./pages/Games";
import Buys from "./pages/Buys";
import WishList from "./pages/WishList";
import Dashboard from "./pages/Dashboard";
import GameDetails from "./pages/GameDetails";
import Cart from "./pages/Cart"
import PaymentSuccess from "./pages/PaymentSuccess";
import WelcomePopup from "./layouts/WelcomePopup";

import PrivateRoute from "./routes/PrivateRoute";

function App() {
  return (
    <div className="app">

      <WelcomePopup />

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
