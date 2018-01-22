let socket = io();

//event listeners
socket.on('connect', function() {
    console.log("user connected to server");

});

socket.on('disconnect', function () {
    console.log('user disconnected from server')
});

//text <li>
socket.on('newMessage', message => {
    console.log("new message", message);
    let li = $('<li></li>');
    li.text(`${message.from}: ${message.text}`);

    $('#messages').append(li);
});

//location <li>
socket.on("newLocationMessage", message => {
    let li = $('<li></li>');
    let a = $('<a target="_blank">Current location</a>');   
    li.text(`${message.from}: `);
    a.attr("href", message.url);
    li.append(a);
    $("#messages").append(li);
})

// event emitter
//3rd argument: callback function that's triggered when acknowledgement arrives
$("#message-form").on("submit", (e) => {
    e.preventDefault();
    socket.emit('createMessage', {
        from: "user",
        text: $('[name=message]').val()
    }, () => {

    })
})

let locationBtn = $("#share_location");
locationBtn.on("click", () => {
    //navigator.geolocation object doesn't exist
    if(!navigator.geolocation) {
        return alert("Geolocation not supported by your browser.");
    }
    else {
        //geoloaction enabbled
        //2nd callback function for error handling
        navigator.geolocation.getCurrentPosition((position) => {
            console.table(position);
            socket.emit("createLocationMessage", {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            }); 
        }, () => {
            alert("Unable to get location")
        });
    }
});