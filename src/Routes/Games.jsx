import React from 'react'
import {fetchGames} from "../api/games"
import GamePageComponent from "../components/GamePageComponent"
function Games() {
  return (
    <>
    
<GamePageComponent 
    sectionName="All Games" 
    fetchGames={fetchGames}
   
    />
    </>
  )
}

export default Games