import React from 'react'
import {fetchCart} from "../api/games"
import GamePageComponent from "../components/GamePageComponent"
import CartComponent from "../components/CartComponent"
function Cart() {
  return (
     <>
    <GamePageComponent 
        sectionName="Cart" 
         fetchGames={fetchCart}
        />

<CartComponent/>
    </>
  )
}

export default Cart