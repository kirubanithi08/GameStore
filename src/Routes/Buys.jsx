import React from 'react'
import {fetchBuys} from "../api/games"
import GamePageComponent from "../components/GamePageComponent"
function Buys() {
  return (
   <>
       <GamePageComponent 
           sectionName="Purchases" 
            fetchGames={fetchBuys}
           />
       </>
  )
}

export default Buys