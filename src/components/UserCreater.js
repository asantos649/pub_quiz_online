import React from 'react';
import { joinGame} from '../action'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import {firstQuestionHandler, connectFirst, startGame} from '../api'
import UserListContainer from '../containers/UserListContainer'


class UserCreater extends React.Component {

    state={
        game: '',
        name: '',
        emoji: ''
    }

    componentDidMount(){
        firstQuestionHandler(() => {
       
            this.props.history.push(`/game/${this.state.game}`)
        })

        if( this.props.isCreate){
            const roomID = this.makeid(5)
            this.setState ({
                game: roomID
            })
        }
        

    }

    // componentWillUpdate(prevProps){
    //     const roomID = this.makeid(4)
    //     this.setState ({
    //         room: roomID
    //     })
    // }

    changeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    emojiClickHandler = (e) => {
        let buttons = document.querySelectorAll('.emoji-button')
        buttons.forEach(button => {
            button.removeAttribute('id')
        })
        e.target.id="selected-emoji"

        this.setState({
            emoji: e.target.innerText
        })
    }

    submitHandler = (e) => {
        e.preventDefault()
   
    }

    startGameHandler = () => {

       
        startGame(this.state.game)
        //     () => {
        //     // debugger
        //     this.props.history.push(`/game/${this.state.game}`)
        // })
    }

    makeid(length) {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
           result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        connectFirst(result.toUpperCase())
        return result.toUpperCase();
     }

     submitButtonHandler = (e) => {
        e.target.innerText = this.state.emoji + ' Ready!'
        e.target.disabled = true

        this.props.submitHandler(this.state.game, this.state.name, this.state.emoji)
        let buttons = document.querySelectorAll('.emoji-button')
        buttons.forEach(button => {
           
            if( button.id !== 'selected-emoji'){
                button.disabled = true
                button.style.opacity = '0.2'
            }
            
        })
     }

    render(){
        return (
            <div className="new-game-container">
                <div className='new-game-left-container'>

                
                <form className='new-game-form' onSubmit={e => this.submitHandler(e)}>
                    <label className='new-game-label'>
                        <div style={{textAlign: 'left'}}>Passcode: </div>
                        {this.props.isCreate ? 
                            <input type="text" className='new-game-input-disabled' disabled={true} value={this.state.game} name="game" />  :
                            <input type="text" className='new-game-input' onChange={(e) => this.changeHandler(e)} name="game" /> 
                        }
                    </label>
                    <label className='new-game-label'>
                        <div>Name: </div>
                        <input type="text" className='new-game-input' onChange={(e) => this.changeHandler(e)} name="name" />
                    </label>
                    
                    <div className='emoji-button-container'>
                        
                        <div className ='emoji-row'>
                            <button onClick={this.emojiClickHandler} type="button" className='emoji-button'>😺</button>
                            <button onClick={this.emojiClickHandler} type="button" className='emoji-button'>👻</button>
                            <button onClick={this.emojiClickHandler} type="button" className='emoji-button'>💩</button>
                            <button onClick={this.emojiClickHandler} type="button" className='emoji-button'>😈</button>
                        </div>
                        <div className = 'emoji-row'>
                            <button onClick={this.emojiClickHandler} type="button" className='emoji-button'>🤖</button>
                            <button onClick={this.emojiClickHandler} type="button" className='emoji-button'>🤡</button>
                            <button onClick={this.emojiClickHandler} type="button" className='emoji-button'>😎</button>
                            <button onClick={this.emojiClickHandler} type="button" className='emoji-button'>👽</button>
                        </div>
                    </div>
                    <div className = 'start-button-container'>
                        <button className= 'submit-button' type='submit' onClick={this.submitButtonHandler}style={{fontSize:'1.25rem', marginLeft: 'auto', marginRight: 'auto'}}>Submit</button>
                        {this.props.isCreate ? <button type='button' onClick = {this.startGameHandler}style={{fontSize:'1.25rem', marginLeft: 'auto', marginRight: 'auto'}}>Start Game</button>  : null}
                    </div>
                </form> 
                </div>
                <div className='users-list'>
                    <UserListContainer />

                </div>
            </div>
         
        )
    }
    
  }

  function mdp(dispatch) {
    return { 
      submitHandler: (room, user, emoji) => {
        dispatch(joinGame(room, user, emoji))
        },
        // startGame: (room) => {
        //     dispatch(startGame(room))
        // }
    }
  }
  
  export default connect(null, mdp)(withRouter(UserCreater));