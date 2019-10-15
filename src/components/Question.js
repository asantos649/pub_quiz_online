import React from 'react';
import QuestionHeader from './QuestionHeader'
import QuestionText from './QuestionText'
import QuestionAnswers from './QuestionAnswers'
import { connect } from 'react-redux'
import { connectNew, fetchQuestion, displayQuestion, leaveRoom, resetTimer, subscribeToTimer, receiveTimer } from '../api';
import { changeQuestions, actTimer } from '../action'

// import { start } from 'repl';

class Question extends React.Component {


  constructor(props) {
    super(props);
    connectNew(`${props.room}`)
    fetchQuestion(`${props.room}`)
    displayQuestion((err, newQuestion) => {
      props.getQuestion(newQuestion)
    })
  }


  
  
  render() {

   
      return (
        <div className='home'>
          <QuestionHeader />
         <QuestionText />
         <QuestionAnswers />
        </div>
      ) 
    
  }
  
};

function msp(state) {
  return {
      room: state.room
  }
}

function mdp(dispatch) {
  return { getQuestion: (newQuestion) => dispatch(changeQuestions(newQuestion)) ,
    // timerHandler: (time, user) => {
    //   dispatch(actTimer(time, user)
    // )}}
  }
}

export default connect(msp, mdp)(Question);