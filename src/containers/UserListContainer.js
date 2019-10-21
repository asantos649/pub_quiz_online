import React from 'react';
import { connect } from 'react-redux'
import {subscribeToUserList} from '../api'
import User from "../components/User"
// import Question from '../components/Question'

class UserListContainer extends React.Component {

    state = {
        users: []
    }

    componentDidMount() {
        subscribeToUserList((newUsers)=>{
    
            this.setState({
                users: newUsers
            })
        })
    }

 

    render() {
        // debugger
        let usersList = this.state.users.map((user) => <User key={user.id} user={user}/>)
        return (
            <div >
                <h3>Users in Game:</h3>
                {usersList}
            </div>
          );
    }
  }
  
  export default UserListContainer;