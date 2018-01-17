const path = require('path');
const publicPath = path.join(__dirname, '../public');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const { PORT }  = require('./config');
const moment = require('moment');

const app = express();
const server = http.createServer(app);
let io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket => {
    console.log("new connection");

    socket.emit('newMessage', {
        from: "bro@msg.com",
        text: "whaddup dog?",
        sent: moment().format("dddd, MMMM Do, YYYY"),
        at: moment().format("h:mm a")
    });

    socket.on('createMessage', (newMessage) => {
        console.log('new message', newMessage);
        io.emit(newMessage, {
            
        })
    })

    socket.on('disconnect', () => {
        console.log('user was disconnected from server')
    }) 
}))

server.listen(PORT, () => {
    console.log(`server is up on port ${PORT}`, )
});

module.exports = { app, server }; 