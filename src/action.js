function changeQuestions(newQuestions) {
    return {payload: newQuestions,
            type: 'QUESTION'}
}

function actTimer(time, question) {
    return {
        
        payload: {
            time: time,
            question, question
        },
        type: 'TIMER'
    }
}

function joinGame(room, user, emoji) {
    console.log('in action', emoji)
    return {
        payload: {
            room: room,
            user, user,
            emoji, emoji
        },
        type: 'JOIN'
    }
}


export {changeQuestions, joinGame, actTimer}