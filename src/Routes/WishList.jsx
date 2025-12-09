import React from 'react'
import {fetchWishlist} from "../api/games"
import GamePageComponent from "../components/UI/GamePageComponent"
function WishList() {
  return (
    <>
    <GamePageComponent 
        sectionName="WishList" 
         fetchGames={fetchWishlist}
        />
    </>
  )
}

export default WishList