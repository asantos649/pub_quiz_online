import React from 'react';
import QuestionHeader from './QuestionHeader'
import QuestionText from './QuestionText'
import QuestionAnswers from './QuestionAnswers'
import { connect } from 'react-redux'
import { fetchQuestion, subscribeToQuestions, getQuestions, leaveRoom, resetTimer} from '../api';
import { changeQuestions} from '../action'

// import { start } from 'repl';

class Question extends React.Component {


  constructor(props) {
    super(props);
    // connectNew(`${props.room}`)
    fetchQuestion(`${props.room}`)
    getQuestions((err, newQuestion) => {
      props.getQuestion(newQuestion)
    })
  }

  componentDidMount(){

    subscribeToQuestions((newIndex) => {

    })

    window.addEventListener('beforeunload', this.componentCleanup);
  }

  componentCleanup = () => { // this will hold the cleanup code
    console.log('cleaningup')
    resetTimer(this.props.room)
    leaveRoom(this.props.room)
}

  componentWillUnmount() {
    this.componentCleanup();
    window.removeEventListener('beforeunload', this.componentCleanup);
  }

  
  
  render() {

   
      return (
        <div className='home'>
          <QuestionHeader />
         <QuestionText />
         <QuestionAnswers />
        </div>
      ) 
    
  }
  
};

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

export default connect(msp, mdp)(Question);