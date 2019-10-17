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
            
            this.setState({
                users: users
            })
        })
    }

    render() {
        let sortedList = this.state.users.sort((a,b) => b.score - a.score)
        let usersComponents = sortedList.map(user => <ScoreCard key={`${user.id}`} user={user}/>)
        
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