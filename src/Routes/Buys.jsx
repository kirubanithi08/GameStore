import React from 'react'
import {fetchBuys} from "../api/games"
import GamePageComponent from "../components/UI/GamePageComponent"
function Buys() {
  return (
   <>
       <GamePageComponent 
           sectionName="My Games" 
            fetchGames={fetchBuys}
           />
       </>
  )
}

export default Buys