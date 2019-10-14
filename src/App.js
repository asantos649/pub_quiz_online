import React from 'react';
import './App.css';
import MainContainer from './containers/MainContainer'
import { connect } from 'react-redux'
import { connectNew, fetchQuestion, displayQuestion, leaveRoom, resetTimer, subscribeToTimer, receiveTimer } from './api';
import { changeQuestions, actTimer } from './action'


class App extends React.Component {

  constructor(props) {
    super(props);
    connectNew(`${props.room}`)
    fetchQuestion(`${props.room}`)
    displayQuestion((err, newQuestion) => {
      props.getQuestion(newQuestion)
    })
  }

  componentDidMount(){
    subscribeToTimer(((err, time) =>  {
      this.props.timerHandler(time)
    }), this.props.room, 30);

    receiveTimer((err, time) =>  {
      this.props.timerHandler(time)
    })

    window.addEventListener('beforeunload', this.componentCleanup);
  }

  componentCleanup = () => { // this will hold the cleanup code
    resetTimer(this.props.room)
    leaveRoom(this.props.room)
}

  componentWillUnmount() {
    this.componentCleanup();
    window.removeEventListener('beforeunload', this.componentCleanup);
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
  return { getQuestion: (newQuestion) => dispatch(changeQuestions(newQuestion)) ,
    timerHandler: (time) => {
      console.log(time)
      dispatch(actTimer(time)
    )}}
}

export default connect(msp, mdp)(App);
