import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:8000')

function connectNew(room) {
    socket.emit('connectNew', room)
}

function subscribeToTimer(cb, room, time) {
    socket.on('timer', timestamp => cb(null, timestamp));
    socket.emit('subscribeToTimer', room, time);
} 

function resetTimer(room) {
    socket.emit('resetTimer', room)
}

function startTimer(room) {
    socket.emit('startTimer', room)
}

function fetchQuestion(room) {
    socket.emit('fetchQuestion', room)
    // setTimeout(()=> {
    //     socket.on('question', question => cb(null ,question))
    // })
}

function displayQuestion(cb) {
        socket.on('question', questions => cb(null ,questions))
}
export { subscribeToTimer, resetTimer, startTimer, connectNew, fetchQuestion, displayQuestion}