import React from 'react';
import { connect } from 'react-redux'
import { fetchScore } from '../api';
import ScoreCard from '../components/ScoreCard'
// import Question from '../components/Question'

class ScoreContainer extends React.Component {

    state = {
        users: []
    }

    componentDidMount() {
        fetchScore(this.props.room, (users) => {
            console.log('cb for fetch score', users)
            this.setState({
                users: users
            })
        })
    }

    render() {
        let usersComponents = this.state.users.map(user => <ScoreCard key={`${Date.now}`} user={user}/>)
        return (
            <div >
                <h2 style={{marginTop: '0%'}}>Final Score</h2>
              {usersComponents}
            </div>
          );
    }
  }

  function msp(state){
      return {
        room: state.room
      }
    
  }
  
  export default connect(msp)(ScoreContainer);