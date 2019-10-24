import React from 'react';
import QuestionHeader from './QuestionHeader'
import QuestionText from './QuestionText'
import QuestionAnswers from './QuestionAnswers'
import { connect } from 'react-redux'
import { fetchQuestion, subscribeToQuestions, getQuestions} from '../api';
import { changeQuestions} from '../action'
import { withRouter } from 'react-router'




class Question extends React.Component {


  constructor(props) {
    super(props);

    fetchQuestion(`${props.room}`)
    getQuestions((err, newQuestion) => {
      props.getQuestion(newQuestion)
    })
  }

  componentDidMount(){

    subscribeToQuestions((newIndex) => {

    })

    if(!this.props.room){
      this.props.history.push('/')
    } 

    if(this.props.room !== ''){
      window.addEventListener('beforeunload', this.componentCleanup)
    }
      
    
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

  }
}

export default connect(msp, mdp)(withRouter(Question));