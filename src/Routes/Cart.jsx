import React from 'react'
import {fetchCart} from "../api/games"
import GamePageComponent from "../components/UI/GamePageComponent"
function Cart() {
  return (
     <>
    <GamePageComponent 
        sectionName="WishList" 
         fetchGames={fetchCart}
        />
    </>
  )
}

export default Cart