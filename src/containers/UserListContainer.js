import React from 'react';
import {subscribeToUserList} from '../api'
import User from "../components/User"

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