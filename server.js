const fetch = require('node-fetch');
const io = require('socket.io')()
const port = 8000;


io.on('connection', (client) => {

    // let room = ''

    client.on('connectNew', (roomVar) => {
        if (!io.sockets.adapter.rooms[roomVar]){
            client.join(roomVar)
            io.sockets.adapter.rooms[roomVar].room = roomVar
        }
        
        // console.log(io.sockets.adapter.rooms[roomVar].counter)
    })
    
    
    client.on('subscribeToTimer', (roomVar, time) => {
        console.log('client is subscribing to room ', time); 
        if (io.sockets.adapter.rooms[roomVar]){
            io.sockets.adapter.rooms[roomVar].counter = time
            io.sockets.adapter.rooms[roomVar].counting = false
        setInterval(() => {
            console.log('in sub', io.sockets.adapter.rooms[roomVar].counter)
            client.broadcast.to(roomVar).emit('timer', io.sockets.adapter.rooms[roomVar].counter);  
        }, 1000);
        }
        
    })

    client.on('resetTimer', (roomVar) => {
        io.sockets.adapter.rooms[roomVar].counter = 30
    })

    client.on('startTimer', (roomVar) => {
        if(io.sockets.adapter.rooms[roomVar] && !io.sockets.adapter.rooms[roomVar].counting){
            console.log('in start time', io.sockets.adapter.rooms[roomVar].counter)
            io.sockets.adapter.rooms[roomVar].counting = true
            setInterval(() => {
                if (io.sockets.adapter.rooms[roomVar].counter !== 0){
                    // console.log('in start timer', io.sockets.adapter.rooms[roomVar].counter)
                    io.sockets.adapter.rooms[roomVar].counter --;
                }    
            }, 1000);
        }
        
    })

    client.on('fetchQuestion', (roomVar) => {
        fetch('https://opentdb.com/api.php?amount=10&difficulty=easy&type=multiple')
        .then(resp => resp.json())
        .then(data => {
            // data.replace(/(&quot\;)/g,"\"")
            // if (io.sockets.adapter.rooms[roomVar]){
                io.sockets.adapter.rooms[roomVar].questions = data.results
                io.to(roomVar).emit('question', io.sockets.adapter.rooms[roomVar].questions)
            // }
            
        })
    })
})

io.listen(port)
console.log('listening on port', port);
