import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { submitUser, resetGame  } from './api'
import {BrowserRouter} from 'react-router-dom';



let defaultState = {
    room: '',
    user: {
      id: 'no-id',
      name: 'NA',
      score: 0,
      emoji: '🙃'
    },
    questions: [],
    questionIndex: 0,
    timer: 30,
    showScore: false,
  }

  const createdStore = createStore(reducer, defaultState)

  function reducer(state, action) {
    switch (action.type) {
        case "QUESTION":
            let newQuestionsArray = [...state.questions]
            newQuestionsArray = action.payload
            return {...state, questions: newQuestionsArray}
        case "NEXT":
            if (state.questions[action.payload.index]){
                return {...state, questionIndex: action.payload.index }
            }else {
                return {...state, showScore: true}
            }
        case 'SCORE':
            return {...state, user: ({...state.user, score: state.user.score + 100})}
        case 'RESET':
            // resetGame(state.room)
            return {...state, questionIndex: 0, showScore: false, user: ({...state.user, score: 0})}
        case 'CLEAN':
            return defaultState
        case 'JOIN':
            // create user and then submit user to api
            
            let newId = new Date().valueOf()
            let newUser = {...state.user, name: action.payload.user, id: newId, emoji: action.payload.emoji}
            submitUser(action.payload.room, newUser)
            
            return {...state, room: action.payload.room, user: newUser}

        case 'TIMER':
                return {...state, timer: action.payload.time}
            // }
            
        default:
            return state
    }
}

ReactDOM.render(
    
    <Provider store={createdStore}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
        
    </Provider>, document.getElementById('root'))
    
    

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
