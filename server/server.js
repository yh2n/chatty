const path = require('path');
const publicPath = path.join(__dirname, '../public');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const moment = require('moment');

const { PORT }  = require('./config');
const { generateMessage, generateLocationMessage } = require('../server/utils/message');
const { isString } = require('../server/utils/validators');

const app = express();
const server = http.createServer(app);
let io = socketIO(server);

app.use(express.static(publicPath));

// <--- SOCKET BUILT-IN METHODS --->
// io.emit: message to every connected user
// socket.broadcast.emit: message to everyone connected to socket server except for message emitter
// socket.broadcast.to: message to everyone in any given room except for message emitter
// socket.emit: message to specific user
// socket.on event listener

io.on('connection', (socket => {
    console.log("new connection");

    //listener for "join"
    socket.on("join", (params, callback) => {
        if(!isString(params.name) || !isString(params.room)) {
            callback("Invalid entry...");
        }
        socket.join(params.room);
        socket.emit('newMessage', generateMessage('Admin', 'Welcome to chatty'));
        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.username} joined the conversation`));
        callback();
    })
    //1st argument to callback argument list is data being sent
    //2nd one is callback function that acknowledges request
    socket.on('createMessage', (message, callback) => {
        console.log('new message', message);
        io.emit('newMessage', generateMessage(message.from, message.text));
        //argument: data being sent to client
        callback();
    });

    socket.on("createLocationMessage", (coords) => {
        io.emit("newLocationMessage", generateLocationMessage("Admin", coords.latitude, coords.longitude));
    });

    socket.on('disconnect', () => {
        console.log('user was disconnected from server')
    }) ;
}))

server.listen(PORT, () => {
    console.log(`server is up on port ${PORT}`, )
});

module.exports = { app, server }; 