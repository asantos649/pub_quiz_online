import React from 'react';
import './App.css';
import MainContainer from './containers/MainContainer'
import { connect } from 'react-redux'
import { leaveRoom, resetTimer} from './api';
import { changeQuestions} from './action'
import {withRouter} from 'react-router-dom';


class App extends React.Component {



  componentDidMount(){

    window.addEventListener('beforeunload', this.componentCleanup);

    
  }

  componentCleanup = () => {
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
        <h1 className='title'>PUB • QUIZ • ONLINE </h1>
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
  }
  
}

export default connect(msp, mdp)(withRouter(App));
