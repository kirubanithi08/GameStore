import React from 'react'
import Hero from '../components/Hero';


import Trending from '../components/Home/Trending';
import NewGames from '../components/Home/NewGames';

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