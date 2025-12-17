import React from 'react'
import {fetchGames} from "../api/games"
import GamePageComponent from "../components/UI/GamePageComponent"
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