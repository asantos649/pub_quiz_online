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

function joinGame(room, user) {
    return {
        payload: {
            room: room,
            user, user
        },
        type: 'JOIN'
    }
}


export {changeQuestions, joinGame, actTimer}