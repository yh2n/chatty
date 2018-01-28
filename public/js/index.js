let socket = io();

//event listeners
socket.on('connect', function() {
    console.log("user connected to server");
});

socket.on('disconnect', function () {
    console.log('user disconnected from server')
});

//text <li>
<<<<<<< HEAD
socket.on('newMessage', function(message) {
    let template = $("#message-template").html();
    let html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        at: moment().format("h:mm a")
    });
=======
socket.on('newMessage', message => {
    console.log("new message", message);
    let li = $('<li></li>');
    li.text(`${message.from}: ${message.text}`);
>>>>>>> 9adb6177bc05d733105b9656482e75bce0ea6eb3

    $("#messages").append(html);
});

//location <li>
socket.on("newLocationMessage", message => {
<<<<<<< HEAD
    let template = $("#location-message-template").html();
    let html = Mustache.render(template, {
        url: message.url,
        from: message.from,
        at: moment().format("h:mm a")
    });
    $("#messages").append(html);
=======
    let li = $('<li></li>');
    let a = $('<a target="_blank">Current location</a>');   
    li.text(`${message.from}: `);
    a.attr("href", message.url);
    li.append(a);
    $("#messages").append(li);
>>>>>>> 9adb6177bc05d733105b9656482e75bce0ea6eb3
})

// event emitter
//3rd argument: callback function that's triggered when acknowledgement arrives
<<<<<<< HEAD
let textField = $('[name=message]')
=======
>>>>>>> 9adb6177bc05d733105b9656482e75bce0ea6eb3
$("#message-form").on("submit", (e) => {
    e.preventDefault();
    socket.emit('createMessage', {
        from: "user",
        text: textField.val()
    }, () => {
        textField.val('')
    })
})

let locationBtn = $("#share_location");
locationBtn.on("click", () => {
    //navigator.geolocation object doesn't exist
<<<<<<< HEAD
    locationBtn.attr("disabled", "disabled").text("Sending location...");
=======
>>>>>>> 9adb6177bc05d733105b9656482e75bce0ea6eb3
    if(!navigator.geolocation) {
        return alert("Geolocation not supported by your browser.");
    }
    else {
        //geoloaction enabbled
        //2nd callback function for error handling
        navigator.geolocation.getCurrentPosition((position) => {
            console.table(position);
<<<<<<< HEAD
            locationBtn.removeAttr("disabled").text("Share location");
=======
>>>>>>> 9adb6177bc05d733105b9656482e75bce0ea6eb3
            socket.emit("createLocationMessage", {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            }); 
        }, () => {
<<<<<<< HEAD
            locationBtn.removeAttr("disabled").text("Share location");
            alert("Unable to get location");
=======
            alert("Unable to get location")
>>>>>>> 9adb6177bc05d733105b9656482e75bce0ea6eb3
        });
    }
});