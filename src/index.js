import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { startTimer, resetTimer } from './api'



let defaultState = {
    room: 'some-room',
    user: {
      id: 'user-id',
      name: 'Andrew',
      score: 0
    },
    questions: [],
    questionIndex: 0,
    timer: 30,
    showScore: false
  }

  const createdStore = createStore(reducer, defaultState)

  function reducer(state, action) {
    switch (action.type) {
        case "QUESTION":
            let newQuestionsArray = [...state.questions]
            newQuestionsArray = action.payload
            return {...state, questions: newQuestionsArray}
        case "NEXT":
            if (state.questions[state.questionIndex+1]){
                return {...state, questionIndex: state.questionIndex +1 }
            }else {
                return {...state, showScore: true}
            }
        case 'SCORE':
            return {...state, user: ({...state.user, score: state.user.score + 100})}
        case 'TIMER':
            // if(action.payload.time === 0){
            //     // resetTimer(state.room)
            //     const buttons = document.querySelectorAll('.answer-button')
            //     buttons.forEach(button => {
            //         if (button.innerText.slice(3) === action.payload.question.correct_answer){
            //           button.id = 'correct-answer'
            //         } else{
            //           button.id = 'incorrect-answer'
            //         }
            //       })
            //     //   setTimeout(() => {
            //     //     // dispatch({type: 'NEXT'})
            //     //     startTimer(state.room)
            //     //   }, 4000)payload
            //       return {...state, timer: action.}
            // } else {
                return {...state, timer: action.payload.time}
            // }
            
        default:
            return state
    }
}

ReactDOM.render(
    <Provider store = {createdStore}>
        <App />
    </Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
