import React from 'react';
import { joinGame } from '../action'
import { connect } from 'react-redux'


class UserCreater extends React.Component {

    state={
        game: '',
        name: '',
        emoji: ''
    }

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
        console.log(e.target.innerText)
    }

    submitHandler(e){
        e.preventDefault()
        // this.props.submitHandler()
        console.log(this.state)
    }

    render(){
        return (
            <div className="new-game-container">
                <form className='new-game-form' onSubmit={e => this.submitHandler(e)}>
                    <label className='new-game-label'>
                        <div>Game Passcode: </div>
                        <input type="text" className='new-game-input' onChange={(e) => this.changeHandler(e)} name="game" />
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
                   <button type='submit' style={{fontSize:'1.25rem', marginLeft: 'auto', marginRight: 'auto'}}>Submit</button>
                </form> 
            </div>
         
        )
    }
    
  }

  function mdp(dispatch) {
    return { 
      submitHandler: (room, user) => {
        dispatch(joinGame(room, user))
        }
    }
  }
  
  export default connect(null, mdp)(UserCreater);