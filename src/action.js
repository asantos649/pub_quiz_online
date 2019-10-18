function changeQuestions(newQuestions) {
    return {payload: newQuestions,
            type: 'QUESTION'}
}

function actTimer(time, question) {
    return {
        
        payload: {
            time: time,
            question: question
        },
        type: 'TIMER'
    }
}

function joinGame(room, user, emoji) {
    return {
        payload: {
            room: room,
            user: user,
            emoji: emoji
        },
        type: 'JOIN'
    }
}

function newQuestion(index) {
    console.log('in newQuestion: ',index)
    return {
        payload: {
            index: index,
        },
        type: 'NEXT'}
}

// function startGame(room) {
//     return {
//         payload: {
//             room: room
//         },
//         type: 'START'
//     }
// }


export {changeQuestions, newQuestion, joinGame, actTimer}