import React from 'react';
import { connect } from 'react-redux'
import { displayQuestion, startTimer, resetTimer} from '../api'
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
        console.log('text render', this.props)
        if(this.props.time === 0) {
            resetTimer(this.props.room)
            const buttons = document.querySelectorAll('.answer-button')
                buttons.forEach(button => {
                    if (button.innerText.slice(3) === this.props.question.correct_answer){
                      button.id = 'correct-answer'
                    } else{
                      button.id = 'incorrect-answer'
                    }
                  })
            setTimeout(() => {
                this.props.nextQuestion()
                buttons.forEach(button => {
                    button.removeAttribute('id')
                  })
                startTimer(this.props.room)
            }, 4000)
        }
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
        room: state.room,
        time: state.timer
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