import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:8000')

function connectNew(room) {
    socket.emit('connectNew', room)
}

function connectFirst(room) {
    socket.emit('connectFirst', room)
}

function subscribeToTimer(cb, room, time) {
    // socket.on('timer', time => cb(null, time))
    
    socket.emit('subscribeToTimer', room, time);

}

function receiveTimer(cb) {
    socket.on('timer', timestamp => {
        console.log('geting from server', timestamp)
        cb(null, timestamp)})
}

function resetTimer(room) {
    socket.emit('resetTimer', room)
}

function startTimer(room) {
    socket.emit('startTimer', room)
}

function fetchQuestion(room) {
    socket.emit('fetchQuestion', room)
}

function displayQuestion(cb) {
        socket.on('question', questions => cb(null ,questions))
}

function leaveRoom(room) {
    socket.emit('disconnect', room)
}

function updateScore(room, user) {
    socket.emit('updateScore', room, user)
}

function fetchScore(roomVar, cb) {
    
    socket.on('showScore', users => cb(users))
    socket.emit('fetchScore', roomVar)

}

function submitUser(roomVar, user) {
    socket.emit('connectNew', roomVar, user)
}

function startGame(roomVar) {
    socket.emit('startGame', roomVar)
}

function firstQuestionHandler(cb) {
    socket.on('firstQuestion', cb)
}

export { subscribeToTimer, connectFirst, startGame, firstQuestionHandler, submitUser, fetchScore, updateScore, receiveTimer, resetTimer, startTimer, connectNew, fetchQuestion, displayQuestion, leaveRoom}