import React from 'react';
import { connect } from 'react-redux'
import { fetchScore, resetTimer, startGame, subscribeToResetGame, subscribeToExit, leaveRoom, killGame } from '../api';
import ScoreCard from '../components/ScoreCard'
import { withRouter } from 'react-router'


class ScoreContainer extends React.Component {

    state = {
        users: []
    }

    componentDidMount() {
        resetTimer(this.props.room)
        fetchScore(this.props.room, (users) => {
            
            this.setState({
                users: users
            })
        })

        subscribeToExit(() => {
          
            resetTimer(this.props.room)
            leaveRoom(this.props.room)
            setTimeout( () => {
                this.props.history.push('/')
                this.props.resetState()
            })
            
        })
    }

    playAgainHandler = (e) => {
        e.target.disabled = true
        resetTimer(this.props.room)
        subscribeToResetGame(() => {
            startGame(this.props.room)
            this.props.resetGame()
        }, this.props.room)
    }

    exitHandler = () => {
        killGame(this.props.room)
    }

    render() {
        let sortedList = this.state.users.sort((a,b) => b.score - a.score)
        let usersComponents = sortedList.map(user => <ScoreCard key={`${user.id}`} user={user}/>)
        
        return (
            <div >
                <h2 style={{marginTop: '0%'}}>Final Score</h2>
                {usersComponents}
                <button className='play-again-button' onClick={this.playAgainHandler}>Play Again</button>
                <button className='exit-button' onClick={this.exitHandler}>Exit</button>

            </div>
          );
    }
  }

  function msp(state){
      return {
        room: state.room
      }
  }

  function mdp(dispatch){
    return {
        resetGame: () => dispatch({type: 'RESET'}), 
        resetState: () => dispatch({type: 'CLEAN'})
    }
  }
  
  export default connect(msp, mdp)(withRouter(ScoreContainer));