import React from 'react';
import { connect } from 'react-redux'
import { resetTimer,  updateScore, nextQuestion, subscribeToShowAnswer, subscribeToQuestions, startTimer } from '../api'
import { newQuestion } from '../action'
import {cleanString} from '../specialCharacterMap'

class QuestionAnswers extends React.Component {

    state ={
        answer: '',
        disable: false
    }


    componentDidMount(){
        subscribeToQuestions((newIndex) => {
            this.props.nextQuestion(newIndex)
        })
        subscribeToShowAnswer(()=> {
           
            setTimeout(()=>{
                const buttons = document.querySelectorAll('.answer-button')
                buttons.forEach(button => {
                    
                    if (button.innerText.slice(3) === cleanString(this.props.question.correct_answer)){
                    button.id = 'correct-answer'
                    } else{
                    button.id = 'incorrect-answer'
                    }
                    if (button.innerText.slice(3) === this.state.answer){
                        button.firstElementChild.className = 'answer-emoji'
                    }
                })
                if (this.state.answer === cleanString(this.props.question.correct_answer)){
                    this.props.increaseScore()
                }
                updateScore(this.props.room, this.props.user)
                // this.setState({
                //     disable: false
                // })
            })
        })
    }

      shouldComponentUpdate(prevProps){
          if(prevProps.question.question !== this.props.question.question){
              return true
          } else {
            return  (this.props.question.displayAnswers[0] === '') ? true : !(prevProps.question.index === this.props.question.index)
                  
          }
      }

    componentDidUpdate(){
       
        resetTimer(this.props.room)
        setTimeout(() => {
            startTimer(this.props.room)})
        const buttons = document.querySelectorAll('.answer-button')
        buttons.forEach(button => {
                button.removeAttribute('id')
                button.lastElementChild.className = 'hidden-emoji'
              })
        this.setState({
                disable: false
            })
    }

    clickHandler = (e) => {
        
        if (!this.state.disable && document.hasFocus()){
           
            e.target.id = 'selected-answer'
            // resetTimer(this.props.room)
            this.setState({
                answer: e.target.innerText.slice(3),
                disable: true
            })

            nextQuestion(this.props.room)
        }
      }

render () {
    if(this.props.question){
    return(
        <div className='answer-container'>
        <div className='answer-button-row'>
            <button className='answer-button' onDoubleClick={e => e.preventDefault()} onClick={this.clickHandler}data-id='0'>A: {cleanString(this.props.question.displayAnswers[0])}<span className='hidden-emoji'>{this.props.user.emoji}</span></button>
            <button className='answer-button' onDoubleClick={e => e.preventDefault()} onClick={this.clickHandler}data-id='1'>B: {cleanString(this.props.question.displayAnswers[1])}<span className='hidden-emoji'>{this.props.user.emoji}</span></button>
        </div>
        <div className='answer-button-row'>
            <button className='answer-button' onDoubleClick={e => e.preventDefault()} onClick={this.clickHandler}data-id='2'>C: {cleanString(this.props.question.displayAnswers[2])}<span className='hidden-emoji'>{this.props.user.emoji}</span></button>
            <button className='answer-button' onDoubleClick={e => e.preventDefault()} onClick={this.clickHandler}data-id='3'>D: {cleanString(this.props.question.displayAnswers[3])}<span className='hidden-emoji'>{this.props.user.emoji}</span></button>
        </div>
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
   
    if (state.questions[state.questionIndex] && !this.props) {
      question = state.questions[state.questionIndex]
      answers = question.incorrect_answers
      answers[3] = question.correct_answer
      return {
        question: {...question, index: state.questionIndex, displayAnswers: shuffleArray(answers)},
        user: state.user,
        room: state.room
      }
    }
    else {
      return {
        question: {index: state.questionIndex, displayAnswers: ["","","",""]},
        user: state.user,
        room: state.room
      }
    }
  }
  function mdp(dispatch) {
    return { 
    //   getQuestion: (newQuestion) => dispatch(changeQuestions(newQuestion)) ,
      nextQuestion: (newIndex) => dispatch(newQuestion(newIndex)),
      increaseScore: () => dispatch({type: 'SCORE'}),
    //   timerHandler: (time) => {
    //     dispatch(actTimer(time)
    //   )}
    }
  }
    
    export default connect(msp, mdp)(QuestionAnswers);