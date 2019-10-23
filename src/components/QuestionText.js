import React from 'react';
import { connect } from 'react-redux'
import { getQuestions, startTimer, resetTimer, nextQuestion} from '../api'
import { changeQuestions, newQuestion} from '../action'
import { withRouter } from 'react-router'
import {cleanString} from '../specialCharacterMap'

class QuestionText extends React.Component {

    constructor(props){
        super(props)  
        getQuestions((err, questions) => {
            this.props.getQuestion(questions)
          })
        // this.state = {
        //     canGetQuestion: true
        // }
        this.canGetQuestion = true
    }

    //   componentDidMount(){
    //       if(!this.props.question){
    //         this.props.history.push('/')
    //       }
        
    //   }

    shouldComponentUpdate(prevProps){
        if(this.props.time === 0){
            return false
        } else {
          return  true
                
        }
    }
    componentDidUpdate(prevProps){
        if(prevProps.question){
            if (prevProps.question.question === this.props.question.question){
                this.canGetQuestion = true
            }
        }
        
    }

    render () {
        const answerButton = document.querySelector('#selected-answer')
        if(this.props.time === 0 && this.canGetQuestion && !answerButton) {
            this.canGetQuestion = false
            console.log('rendertext', this.canGetQuestion)
            setTimeout(() => {
                resetTimer(this.props.room)
                nextQuestion(this.props.room)
            })
            
            
        }
        if(this.props.question){
            // startTimer(this.props.room)
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
      nextQuestion: (newIndex) => dispatch(newQuestion(newIndex))
    }
  }
    
    export default connect(msp, mdp)(withRouter(QuestionText));