import React from 'react';
import { connect } from 'react-redux'
import { fetchScore, resetTimer, startGame, connectFirst, subscribeToResetGame, subscribeToExit, leaveRoom, killGame } from '../api';
import ScoreCard from '../components/ScoreCard'
import { type } from 'os';
import { withRouter } from 'react-router'

// import Question from '../components/Question'

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
           console.log('exiting', this.props.room)
            resetTimer(this.props.room)
            leaveRoom(this.props.room)
            // this.props.resetState()
            setTimeout( () => {
                this.props.history.push('/')
                this.props.resetState()
            })
            
        })
    }

    // makeid(length) {
    //     var result           = '';
    //     var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    //     var charactersLength = characters.length;
    //     for ( var i = 0; i < length; i++ ) {
    //        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    //     }
    //     connectFirst(result.toUpperCase())
    //     return result.toUpperCase();
    //  }

    playAgainHandler = (e) => {
        e.target.disabled = true
        resetTimer(this.props.room)
        // const newRoom = this.makeid(7)
        subscribeToResetGame(() => {
            startGame(this.props.room)
            this.props.resetGame()
        }, this.props.room)
        // startGame(this.props.room)
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