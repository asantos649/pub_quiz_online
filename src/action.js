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


export {changeQuestions, actTimer}