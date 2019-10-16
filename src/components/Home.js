import React from 'react';
import { Link } from 'react-router-dom'

// function joinPrivateHandler(){
//   this.props.history.push('/')
// }

function Home() {
    return (
      <div className='home'>
        <div className='home-container'>
            <div className= 'public-button'>Join a Public Game</div>
            <div className='private-game-container'>
                <Link to='/join' className='private-button'>Join a Private Game</Link >
                <Link to='/createGame' className='private-button'>Create a Private Game</Link >
            </div>
        </div>
      </div>
    );
  }
  
  export default Home;