import React from 'react';
import { connect } from 'react-redux'
import { subscribeToTimer, startTimer, receiveTimer, resetTimer } from '../api'
import { actTimer } from '../action'


class QuestionHeader extends React.Component {


      componentDidMount(){
          
        receiveTimer((err, time) =>  {
            this.props.timerHandler(time, this.props.user)
          })
        resetTimer(this.props.room)
        // setTimeout(()=>{
        //     startTimer(this.props.room)
        // })
                
        subscribeToTimer(((err, time) =>  {
          this.props.timerHandler(time)
        }), this.props.room, 30);
      }

render () {
    if(this.props.question){
    return(
        <div className='question-header'>
            <div className='question-tracker'> {this.props.question.index + 1} of {this.props.questions.length}</div>
            <div className='question-timer'>Time: {this.props.timer}</div>
            <div className='user-score'>Score: {this.props.user.score}</div>
        </div>
    )
    } else {
        return <div></div>
      }
}


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
        question: {...question, index: state.questionIndex},
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
      timerHandler: (time, user) => {
        dispatch(actTimer(time, user)
      )}
    }
  }
    
    export default connect(msp, mdp)(QuestionHeader);