import React from 'react'
// import {fetchWishlist} from "../api/games"
import GamePageComponent from "../components/UI/GamePageComponent"
function Buys() {
  return (
   <>
       <GamePageComponent 
           sectionName="My Games" 
            // fetchGames={fetchWishlist}
           />
       </>
  )
}

export default Buys