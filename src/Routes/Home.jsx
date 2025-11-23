import React from 'react'
import Hero from '../components/Hero';


import Trending from '../components/Games/Trending';
import NewGames from '../components/Games/NewGames';

function Home() {
  return (
    <div>
      <Hero />

<Trending />  

<NewGames />
     </div>
  )
}

export default Home;