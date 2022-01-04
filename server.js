const express = require('express')
const app = express()
const path = require('path');
// const {server} = require('http').Server(app)
// const io = require('socket.io')(server)
const cors = require('cors')
const { Server } = require('socket.io')
// app.use(
//     cors({
//         origin: "http://localhost:3000", // allow to server to accept request from different origin
//         methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//         credentials: true, // allow session cookie from browser to pass through
//     })
// );

const io = new Server(process.env.PORT ?? 3001, {
    cors: {
        origin: ['http://localhost:3000'],
        methods: ['GET', 'POST']
    }
});

let i = 0
io.on('connection', socket => {
    console.log('connection', i++);
    // console.log(socket);

    socket.on('join-room', (roomId, userId, userName) => {
        console.log('join', roomId, userId);


        socket.join(roomId)
        socket.to(roomId).emit('user-connected', { userId, userName })

        socket.on('disconnect', () => {
            socket.to(roomId).emit('user-disconnected', userId)
            console.log("user disconnected");

        })
    })

})

// if (process.env.NODE_ENV === 'production') { app.use(express.static(path.join(__dirname, 'build'))); }  //  app.get('*', (req, res) => {    res.sendfile(path.join(__dirname = 'client/build/index.html'));  })}


// server.listen(3001)