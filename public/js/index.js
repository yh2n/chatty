let socket = io();

socket.on('connect', function() {
    console.log("user connected to server");
});

socket.on('disconnect', function () {
    console.log('user disconnected from server')
});

socket.on('newMessage', function(message) {
    console.log("new message", message)
});