const path = require('path');
const publicPath = path.join(__dirname, '../public');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const moment = require('moment');

const { PORT }  = require('./config');
const { generateMessage, generateLocationMessage } = require('../server/utils/message');
const { Users } = require('../server/utils/users');
const { validEntry } = require('../server/utils/validators');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const users = new Users;

app.use(express.static(publicPath));

// <--- SOCKET BUILT-IN METHODS --->
// io.emit: message to every connected 
// io.to.emit: messsage to everyone in any given room
// socket.broadcast.emit: message to everyone connected to socket server except for message emitter
// socket.broadcast.to: message to everyone in any given room except for message emitter
// socket.emit: message to specific user
// socket.on: event listener
// socket.join: join a room
// socket.leave

io.on('connection', (socket => {
    console.log("new connection");

    //listener for "join"
    socket.on("join", (params, callback) => {
        if(!validEntry(params.username) || !validEntry(params.room)) {
            return callback("Invalid entry...");
        }
        socket.join(params.room);
        users.removeUser(socket.id);
        users.addUser(socket.id, params.username, params.room);
        io.to(params.room).emit('userListUpdate', users.getUserList(params.room))
        socket.emit('newMessage', generateMessage('Admin', `Welcome to chat'up`));
        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.username} joined the conversation`));
        callback();
    });

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
        user = users.removeUser(socket.id);
        console.log('user was disconnected from server')
        if(user) {
            io.to(user.room).emit("userListUpdate", users.getUserList(user.room));
            io.to(user.room).emit("newMessage", generateMessage('Admin', `${user.name} left`));
        }
    });
}))

server.listen(PORT, () => {
    console.log(`server is up on port ${PORT}`, )
});

module.exports = { app, server }; 