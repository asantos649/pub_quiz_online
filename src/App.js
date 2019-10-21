import React from 'react';
import './App.css';
import MainContainer from './containers/MainContainer'
import { connect } from 'react-redux'
import { leaveRoom, resetTimer, subscribeToTimer } from './api';
import { changeQuestions, actTimer } from './action'
import {withRouter} from 'react-router-dom';


class App extends React.Component {

  // constructor(props) {
  //   super(props);
  //   connectNew(`${props.room}`)
  //   fetchQuestion(`${props.room}`)
  //   displayQuestion((err, newQuestion) => {
  //     props.getQuestion(newQuestion)
  //   })
  // }

  componentDidMount(){

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
    // timerHandler: (time, user) => {
    //   dispatch(actTimer(time, user)
    // )}}
  }
  
}

export default connect(msp, mdp)(withRouter(App));
