import React from 'react';
import { Link } from 'react-router-dom'



function Home() {
    return (
      <div className='home'>
        <div className='home-container'>
            <div className='private-game-container'>
                <Link to='/join' className='private-button' id='join'>Join a Game</Link >
                <Link to='/createGame' className='private-button' id='create'>Create a Game</Link >
            </div>
        </div>
      </div>
    );
  }
  
  export default Home;