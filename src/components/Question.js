import React from 'react';
import { connect } from 'react-redux'
import QuestionHeader from './QuestionHeader'
import { displayQuestion, subscribeToTimer, startTimer } from '../api'
import { changeQuestions, actTimer } from '../action'
import {specialChar} from '../specialCharacterMap'

class Question extends React.Component {

  constructor(props){
    super(props)  
    displayQuestion((err, questions) => {
      console.log("fetching questions", questions)
      this.props.getQuestion(questions)
    })
    
  }

  cleanString(string) {
    let newString
    if (string.match(/&.*?;/g)){
      string.match(/&.*?;/g).forEach((str)=>{
        const regex = new RegExp(str, 'g')
        newString = string.replace(regex, specialChar[str])
        
      })} else {
        newString = string
      }    
    return newString
  }

  clickHandler = (e) => {
    const buttons = document.querySelectorAll('.answer-button')

    buttons.forEach(button => {
      if (button.innerText.slice(3) === this.props.question.correct_answer){
        button.id = 'correct-answer'
      } else{
        button.id = 'incorrect-answer'
      }
    })

    e.persist()
    setTimeout((event) => {
      buttons.forEach(button => {
        button.removeAttribute('id')
      })
      if (event.target.innerText.slice(3) === this.props.question.correct_answer){
        this.props.increaseScore()
      }
      this.props.nextQuestion()
    }, 4000, e);
      
  }
  
  componentDidMount(){
    // console.log('compDM')
    // startTimer(this.props.room)
    // subscribeToTimer(((err, time) =>  {
    //   console.log('in sub', time)
    //   this.props.timerHandler(time)
    // }), this.props.room, this.props.timer);
    
  }
  
  render() {
    
    console.log(this.props)
    if(this.props.question){
      return (
        <div className='home'>
          <QuestionHeader />
          <div className='question-text-box'>
              <div className='question-category'>{this.props.question.category}</div>
              <div className='question-text'>{this.cleanString(this.props.question.question)}</div>
          </div>
          <div className='answer-container'>
              <div className='answer-button-row'>
                  <button className='answer-button' onClick={this.clickHandler}data-id='0'>A: {this.cleanString(this.props.question.displayAnswers[0])}</button>
                  <button className='answer-button' onClick={this.clickHandler}data-id='1'>B: {this.cleanString(this.props.question.displayAnswers[1])}</button>
              </div>
              <div className='answer-button-row'>
                  <button className='answer-button' onClick={this.clickHandler}data-id='2'>C: {this.cleanString(this.props.question.displayAnswers[2])}</button>
                  <button className='answer-button' onClick={this.clickHandler}data-id='3'>D: {this.cleanString(this.props.question.displayAnswers[3])}</button>
              </div>
          </div>
        </div>
      ) 
    }else {
      return <div></div>
    }
    
  }
  
};

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
      question: {...question, index: state.questionIndex, displayAnswers: shuffleArray(answers)},
      user: state.user,
      // timer: state.timer
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
    nextQuestion: () => dispatch({type: 'NEXT'}),
    increaseScore: () => dispatch({type: 'SCORE'}),
    timerHandler: (time) => {
      console.log(time)
      dispatch(actTimer(time)
    )}
  }
}
  
  export default connect(msp, mdp)(Question);