let socket = io();
//let moment = moment();

socket.on('connect', function() {
    console.log("user connected to server");

    socket.emit('createMessage', {
        to: "dude@msg.com",
        text: "All good man...",
        sent: moment().format("dddd, MMMM Do, YYYY"),
        at: moment().format("h:m a")
    })
});

socket.on('disconnect', function () {
    console.log('user disconnected from server')
});

socket.on('newMessage', function(message) {
    console.log("new message", message)
});