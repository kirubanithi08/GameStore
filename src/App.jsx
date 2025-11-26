import { Route, Routes } from "react-router-dom";
import SideBar from "./components/SideBar"

import Home from "./Routes/Home"
import Games from "./Routes/Games";
import Buys from "./Routes/Buys"
import WishList from "./Routes/WishList"
import Dashboard from "./Routes/Dashboard"
import GameDetails from "./Pages/GameDetails";


function App() {
  return (

    <div className="app">
      <SideBar />

        <Routes>
        <Route path="/" element={<Home />} />
         <Route path="/games" element={<Games />} />
        <Route path="/buys" element={<Buys />} />
        <Route path="/wishList" element={<WishList />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/game/:id" element={<GameDetails />} />

      </Routes>

      {/* <i class="fa-light fa-magnifying-glass"></i> */}
    </div>
  )
}

export default App;