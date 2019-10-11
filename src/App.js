import React from 'react';
import './App.css';
import MainContainer from './containers/MainContainer'
import { connect } from 'react-redux'
import { connectNew, fetchQuestion, displayQuestion } from './api';
import { changeQuestions } from './action'


class App extends React.Component {

  constructor(props) {
    super(props);
    connectNew(`${props.room}`)
    fetchQuestion(`${props.room}`)
    displayQuestion((err, newQuestion) => {
      props.getQuestion(newQuestion)
    })
  }

  

  render(){
    return (
      <div className="App">
        <MainContainer />
      </div>
    );
  }
  
}

function msp(state) {
  return {
      room: state.room
  }
}

function mdp(dispatch) {
  return { getQuestion: (newQuestion) => dispatch(changeQuestions(newQuestion)) }
}

export default connect(msp, mdp)(App);
