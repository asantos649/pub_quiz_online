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
            io.in(roomVar).emit('addUser', io.sockets.adapter.rooms[roomVar].users)
        } else {
            client.join(roomVar)
            io.sockets.adapter.rooms[roomVar].users.push(user)
            io.in(roomVar).emit('addUser', io.sockets.adapter.rooms[roomVar].users)
        }
    })

    client.on('firstConnect', (roomVar) => {
        client.join(roomVar)
        if (!io.sockets.adapter.rooms[roomVar]){
            // client.join(roomVar)
            io.sockets.adapter.rooms[roomVar].room = roomVar
        } 
    })

    client.on('disconnectRoom', (roomVar) => {
        console.log('leaving room', roomVar)
        client.leave(roomVar)
        // clearInterval(io.sockets.adapter.rooms[roomVar].timer)
    })
    
    client.on('subscribeToTimer', (roomVar, time) => {
        console.log('number of subscribeToTimer')
        if (io.sockets.adapter.rooms[roomVar]){
            io.sockets.adapter.rooms[roomVar].counter = time
            io.sockets.adapter.rooms[roomVar].counting = false
            setInterval(() => {
            if (io.sockets.adapter.rooms[roomVar]){
                io.to(roomVar).emit('timer', io.sockets.adapter.rooms[roomVar].counter)}
        }, 1000)
            }
            
    })

    // client.on('unsubscribe', (roomVar) => {
    //     if(io.sockets.adapter.rooms[roomVar]){
    //         clearInterval(io.sockets.adapter.rooms[roomVar].timer)
    //     }
    // })

    client.on('resetTimer', (roomVar) => {
        // clearInterval(io.sockets.adapter.rooms[roomVar].timer)
      
        if(io.sockets.adapter.rooms[roomVar]){
            io.sockets.adapter.rooms[roomVar].counter = 30
            clearInterval(io.sockets.adapter.rooms[roomVar].timer)
        }
        
    })

    client.on('startTimer', (roomVar) => {
        if(io.sockets.adapter.rooms[roomVar]){
            if (io.sockets.adapter.rooms[roomVar].timer){
                clearInterval(io.sockets.adapter.rooms[roomVar].timer)
            }
            io.sockets.adapter.rooms[roomVar].timer = setInterval(() => {
                console.log('trying to send', io.sockets.adapter.rooms[roomVar].counter)
                if (io.sockets.adapter.rooms[roomVar] && io.sockets.adapter.rooms[roomVar].counter !== 0){
                    io.sockets.adapter.rooms[roomVar].counter --;
                }    
            }, 1000);
        }
        
    })

    client.on('fetchQuestion', (roomVar) => {
        if (io.sockets.adapter.rooms[roomVar] && !io.sockets.adapter.rooms[roomVar].questions) {
            fetch('https://opentdb.com/api.php?amount=3&difficulty=easy&type=multiple')
            .then(resp => resp.json())
            .then(data => {
                // data.replace(/(&quot\;)/g,"\"")
                // if (io.sockets.adapter.rooms[roomVar]){
                    io.sockets.adapter.rooms[roomVar].questions = data.results
                    io.sockets.adapter.rooms[roomVar].questionIndex = 0
                    io.sockets.adapter.rooms[roomVar].questionCounter = 0
                    io.to(roomVar).emit('question', io.sockets.adapter.rooms[roomVar].questions)
                // }
                
            })
        }
        
    })

    client.on('updateScore', (roomVar, user) => {
        if(io.sockets.adapter.rooms[roomVar]){
            if (!io.sockets.adapter.rooms[roomVar].users.some(userObj => userObj.id === user.id)){
                io.sockets.adapter.rooms[roomVar].users = [...io.sockets.adapter.rooms[roomVar].users, user]
            } else if (io.sockets.adapter.rooms[roomVar].users.length > 0){
                
                let newArray = io.sockets.adapter.rooms[roomVar].users.map(userObj => {
                    
                    if (userObj.id === user.id){
                        
                        return user
                    } else {
                        return userObj
                    }
                }) 
                io.sockets.adapter.rooms[roomVar].users = newArray
            }
        }
        
        
    })

    client.on('fetchScore', (roomVar) => {
        io.to(roomVar).emit('showScore', io.sockets.adapter.rooms[roomVar].users )
    })

    client.on('startGame', (roomVar) => {
        io.in(roomVar).emit('firstQuestion')
    })

    client.on('moveQuestionIndex', (roomVar) => {
        console.log(io.sockets.adapter.rooms[roomVar].questionCounter)
        if (io.sockets.adapter.rooms[roomVar].questionCounter < io.sockets.adapter.rooms[roomVar].users.length-1){
            io.sockets.adapter.rooms[roomVar].questionCounter ++
        } else {
            io.sockets.adapter.rooms[roomVar].questionIndex ++
            io.sockets.adapter.rooms[roomVar].questionCounter = 0
            io.in(roomVar).emit('showAnswers')
            setTimeout(() => {
                io.in(roomVar).emit('sendQuestion', io.sockets.adapter.rooms[roomVar].questionIndex)
            },4000)
        }
    })

    client.on('killGame', roomVar => {
        io.in(roomVar).emit('exitGame')
    })

    client.on("resetGame", (roomVar) => {
        console.log('in resetGame')
        if (io.sockets.adapter.rooms[roomVar].questionCounter < io.sockets.adapter.rooms[roomVar].users.length-1){
            io.sockets.adapter.rooms[roomVar].questionCounter ++
        } else {
        fetch('https://opentdb.com/api.php?amount=3&difficulty=easy&type=multiple')
            .then(resp => resp.json())
            .then(data => {

                    io.sockets.adapter.rooms[roomVar].questions = data.results
                    io.sockets.adapter.rooms[roomVar].questionIndex = 0
                    io.sockets.adapter.rooms[roomVar].questionCounter = 0
                    io.to(roomVar).emit('startResetGame')
                    io.to(roomVar).emit('question', io.sockets.adapter.rooms[roomVar].questions)
                    io.in(roomVar).emit('firstQuestion')
                    clearInterval(io.sockets.adapter.rooms[roomVar].timer)
            })
        }
    })

})

io.listen(port)
console.log('listening on port', port);
