function changeQuestions(newQuestions) {
    return {payload: newQuestions,
            type: 'QUESTION'}
}

function actTimer(time) {
    return {
        payload: time,
        type: 'TIMER'
    }
}

export {changeQuestions, actTimer}