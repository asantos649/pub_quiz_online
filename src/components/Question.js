import React from 'react';
import QuestionHeader from './QuestionHeader'
import QuestionText from './QuestionText'
import QuestionAnswers from './QuestionAnswers'

// import { start } from 'repl';

class Question extends React.Component {





  
  
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


  export default Question;