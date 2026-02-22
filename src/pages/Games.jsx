import React from "react";
import { fetchGames } from "../services/games";
import GamePageComponent from "../components/GamePageComponent";

export default function Games() {
  return (
    <GamePageComponent
      sectionName="All Games"
      fetchGames={fetchGames}
    />
  );
}