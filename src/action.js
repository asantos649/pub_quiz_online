function changeQuestions(newQuestions) {
    return {payload: newQuestions,
            type: 'QUESTION'}
}

function actTimer(time) {
    console.log('in action', time)
    return {
        payload: time,
        type: 'TIMER'
    }
}

export {changeQuestions, actTimer}