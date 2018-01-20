let socket = io();

socket.on('connect', function() {
    console.log("user connected to server");
});

socket.on('disconnect', function () {
    console.log('user disconnected from server')
});

socket.on('newMessage', function(message) {
    console.log("new message", message);
    let li = $('<li></li>');
    li.text(`${message.from}: ${message.text}`);

    $('#messages').append(li);
});

// event emitter
//3rd argument: callback function that's triggered when 
//acknowledgement arrives
socket.emit('createMessage', {
    from: "Paul",
    text:'yo!!'
}, function(info) {
    console.log(`gotcha ${info}`)
});

$("#message-form").on("submit", (e) => {
    e.preventDefault();
    socket.emit('createMessage', {
        from: "user",
        text: $('[name=message]').val()
    }, () => {

    })
})