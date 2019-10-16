const fetch = require('node-fetch');
const io = require('socket.io')()
const port = 8001;


io.on('connection', (client) => {

    // let room = ''

    client.on('connectNew', (roomVar, user) => {
        if (!io.sockets.adapter.rooms[roomVar]){
            client.join(roomVar)
            io.sockets.adapter.rooms[roomVar].room = roomVar
            io.sockets.adapter.rooms[roomVar].users = [user]
        } else {
            client.join(roomVar)
            io.sockets.adapter.rooms[roomVar].users.push(user)
        }
    })

    client.on('firstConnect', (roomVar) => {
        client.join(roomVar)
        if (!io.sockets.adapter.rooms[roomVar]){
            // client.join(roomVar)
            io.sockets.adapter.rooms[roomVar].room = roomVar
        } 
    })

    client.on('disconnect', (roomVar) => {
        client.leave(roomVar)
    })
    
    client.on('subscribeToTimer', (roomVar, time) => {
        console.log('client is subscribing to room ', time); 
        if (io.sockets.adapter.rooms[roomVar]){
            io.sockets.adapter.rooms[roomVar].counter = time
            io.sockets.adapter.rooms[roomVar].counting = false
            setInterval(() => {
            if (io.sockets.adapter.rooms[roomVar]){
            client.emit('timer', io.sockets.adapter.rooms[roomVar].counter)}
        }, 1000)
            }
            
    })

    client.on('resetTimer', (roomVar) => {
        clearInterval(io.sockets.adapter.rooms[roomVar].timer)
        console.log('resettingTimer for room', roomVar)
        if(io.sockets.adapter.rooms[roomVar]){
            io.sockets.adapter.rooms[roomVar].counter = 30
            clearInterval(io.sockets.adapter.rooms[roomVar].timer)
        }
        
    })

    client.on('startTimer', (roomVar) => {
        if(io.sockets.adapter.rooms[roomVar]){
            console.log('in start time', io.sockets.adapter.rooms[roomVar].counter)
            io.sockets.adapter.rooms[roomVar].timer = setInterval(() => {
                if (io.sockets.adapter.rooms[roomVar] && io.sockets.adapter.rooms[roomVar].counter !== 0){
                    io.sockets.adapter.rooms[roomVar].counter --;
                }    
            }, 1000);
        }
        
    })

    client.on('fetchQuestion', (roomVar) => {
        if (!io.sockets.adapter.rooms[roomVar].questions) {
            fetch('https://opentdb.com/api.php?amount=3&difficulty=easy&type=multiple')
            .then(resp => resp.json())
            .then(data => {
                // data.replace(/(&quot\;)/g,"\"")
                // if (io.sockets.adapter.rooms[roomVar]){
                    io.sockets.adapter.rooms[roomVar].questions = data.results
                    io.sockets.adapter.rooms[roomVar].questionIndex = 0
                    io.to(roomVar).emit('question', io.sockets.adapter.rooms[roomVar].questions)
                // }
                
            })
        }
        
    })

    client.on('updateScore', (roomVar, user) => {
        console.log(io.sockets.adapter.rooms[roomVar])
        if (!io.sockets.adapter.rooms[roomVar].users.some(userObj => userObj.id === user.id)){
            io.sockets.adapter.rooms[roomVar].users = [...io.sockets.adapter.rooms[roomVar].users, user]
        } else if (io.sockets.adapter.rooms[roomVar].users.length > 0){
            
            let newArray = io.sockets.adapter.rooms[roomVar].users.map(userObj => {
                console.log('users', userObj)
                if (userObj.id === user.id){
                    console.log(user)
                    return user
                } else {
                    return userObj
                }
            })
            console.log('newArray', newArray)
            io.sockets.adapter.rooms[roomVar].users = newArray
        }
        
    })

    client.on('fetchScore', (roomVar) => {
        io.to(roomVar).emit('showScore', io.sockets.adapter.rooms[roomVar].users )
    })

    client.on('startGame', (roomVar) => {
        console.log(roomVar)
        io.in(roomVar).emit('firstQuestion')
    })

    client.on('moveQuestionIndex', (roomVar) => {
        io.sockets.adapter.rooms[roomVar].questionIndex ++
        io.in(roomVar).emit('sendQuestion', io.sockets.adapter.rooms[roomVar].questionIndex)
    })
})

io.listen(port)
console.log('listening on port', port);
