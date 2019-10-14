import React from 'react';
import { connect } from 'react-redux'
import { displayQuestion} from '../api'
import { changeQuestions} from '../action'
import {cleanString} from '../specialCharacterMap'

class QuestionText extends React.Component {

    constructor(props){
        super(props)  
        displayQuestion((err, questions) => {
            this.props.getQuestion(questions)
          })
      }

    render () {
        if(this.props.question){
        return(
            <div className='question-text-box'>
                <div className='question-category'>{this.props.question.category}</div>
                <div className='question-text'>{cleanString(this.props.question.question)}</div>
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
        question: {...question, index: state.questionIndex},
        user: state.user,
        room: state.room
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
      getQuestion: (newQuestion) => dispatch(changeQuestions(newQuestion)) ,
      nextQuestion: () => dispatch({type: 'NEXT'})
    }
  }
    
    export default connect(msp, mdp)(QuestionText);