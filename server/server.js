const path = require('path');
const publicPath = path.join(__dirname, '../public');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const { PORT }  = require('./config');
const moment = require('moment');

const { generateMessage } = require('../server/utils/message');
const app = express();
const server = http.createServer(app);
let io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket => {
    console.log("new connection");

    socket.emit('newMessage', generateMessage('Admin', 'Welcome to chatty'));
    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));

    //1st argument to callback argument listis data being sent
    //2nd one is callback fcunction that acknowledges request
    socket.on('createMessage', (message, callback) => {
        console.log('new message', message);
        io.emit('newMessage', generateMessage(message.from, message.text));
        //argument: data being sent to client
        callback(`(from: server)`);
    })

    socket.on('disconnect', () => {
        console.log('user was disconnected from server')
    }) 
}))

server.listen(PORT, () => {
    console.log(`server is up on port ${PORT}`, )
});

module.exports = { app, server }; 