import React from 'react';

function ScoreCard(props) {
    return (
     <div className='score-card'>
         <div>{props.user.emoji} </div>
         <div className='score-value'>{props.user.name}</div>
         <div className='score-value'>{props.user.score}</div>
     </div>
    );
  }
  
  export default ScoreCard;