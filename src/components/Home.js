import React from 'react';

function Home() {
    return (
      <div className='home'>
        <div className='home-container'>
            <div className= 'public-button'>Join a Public Game</div>
            <div className='private-game-container'>
                <div className='private-button'>Join a Private Game</div>
                <div className='private-button'>Create a Private Game</div>
            </div>
        </div>
      </div>
    );
  }
  
  export default Home;