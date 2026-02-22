import React from 'react'
import { fetchWishlist } from "../services/games"
import GamePageComponent from "../components/GamePageComponent"
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