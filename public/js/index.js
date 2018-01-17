let socket = io();

socket.on('connect', function() {
    console.log("user connected to server");

    socket.emit('createMessage', {
        from: "dude@msg.com",
        text: "All good man..."
    })
});

socket.on('disconnect', function () {
    console.log('user disconnected from server')
});

socket.on('newMessage', function(message) {
    console.log("new message", message)
});