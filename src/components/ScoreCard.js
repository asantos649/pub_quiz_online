import React from 'react';

function ScoreCard(props) {
    return (
     <div className='score-card'>
         <div>{props.user.emoji} {props.user.name}</div>
         <div>{props.user.score}</div>
     </div>
    );
  }
  
  export default ScoreCard;