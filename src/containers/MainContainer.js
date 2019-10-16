import React from 'react';
import Home from '../components/Home'
import Question from '../components/Question'
import { connect } from 'react-redux'
import ScoreContainer from './ScoreContainer';
import UserCreater from '../components/UserCreater'
import { Route, Switch } from "react-router-dom";

function MainContainer(props) {
    return (
      <div className="main-container">
        <Switch>
          <Route 
            exact path='/'
            component={Home} 
          />

          <Route 
            exact path='/join'
            render={() => {
              return <UserCreater isCreate={false} />
            }} 
          />

          <Route 
            exact path='/createGame'
            render={() => {
              return <UserCreater isCreate={true} />
            }} 
          />

          <Route 
            path='/game'
            render={() => {
              return props.showScore ? <ScoreContainer /> : <Question />
            }}
          />
        
        {/* {props.showScore ? <ScoreContainer /> : <Question />} */}
        {/* <UserCreater /> */}
        </Switch>
      </div>
    )
  }

  function msp(state){
    return {
      showScore: state.showScore
    }
    
  }
  
  export default connect(msp)(MainContainer);