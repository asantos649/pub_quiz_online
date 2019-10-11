import React from 'react';
import { connect } from 'react-redux'
import { displayQuestion, subscribeToTimer, startTimer } from '../api'
import { changeQuestions, actTimer } from '../action'
import {specialChar} from '../specialCharacterMap'

class QuestionHeader extends React.Component {

    constructor(props){
        super(props)  
        subscribeToTimer(((err, time) =>  {
          console.log('in sub', time)
          this.props.timerHandler(time)
        }), this.props.room, 30);
      }

      componentDidMount(){
        startTimer(this.props.room)
      }

render () {
    if(this.props.question){
    return(
        <div className='question-header'>
            <div className='question-tracker'> {this.props.question.index + 1} of 10</div>
            <div className='question-timer'>Time: {this.props.timer}</div>
            <div className='user-score'>Score: {this.props.user.score}</div>
        </div>
    )
    } else {
        return <div></div>
      }
}


}


function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array
  }
  
  function msp(state) {
    let question={}
    let answers=[]
    if (state.questions[state.questionIndex] && !state.question) {
      question = state.questions[state.questionIndex]
      answers = [...question.incorrect_answers]
      answers[3] = question.correct_answer
    
      return {
          ...state,
        question: {...question, index: state.questionIndex, displayAnswers: shuffleArray(answers)},
        user: state.user,
        timer: state.timer
      }
    }
    else {
      return (
        state
      )
    }
  }
  function mdp(dispatch) {
    return { 
    //   getQuestion: (newQuestion) => dispatch(changeQuestions(newQuestion)) ,
    //   nextQuestion: () => dispatch({type: 'NEXT'}),
      increaseScore: () => dispatch({type: 'SCORE'}),
      timerHandler: (time) => {
        console.log(time)
        dispatch(actTimer(time)
      )}
    }
  }
    
    export default connect(msp, mdp)(QuestionHeader);