import React from 'react'
import {fetchCart} from "../api/games"
import GamePageComponent from "../components/GamePageComponent"
function Cart() {
  return (
     <>
    <GamePageComponent 
        sectionName="Cart" 
         fetchGames={fetchCart}
        />
    </>
  )
}

export default Cart