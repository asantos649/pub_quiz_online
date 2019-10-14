import React from 'react';
// import Home from '../components/Home'
import Question from '../components/Question'
import { connect } from 'react-redux'
import ScoreContainer from './ScoreContainer';

function MainContainer(props) {
    return (
      <div className="main-container">
        {/* <Home /> */}
        {props.showScore ? <ScoreContainer /> : <Question />}
      </div>
    );
  }

  function msp(state){
    return {
      showScore: state.showScore
    }
    
  }
  
  export default connect(msp)(MainContainer);