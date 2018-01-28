let socket = io();

//event listeners
socket.on('connect', function() {
    console.log("user connected to server");
});

socket.on('disconnect', function () {
    console.log('user disconnected from server')
});

//text <li>
socket.on('newMessage', function(message) {
    let template = $("#message-template").html();
    let html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        at: moment().format("h:mm a")
    });

    $("#messages").append(html);
});

//location <li>
socket.on("newLocationMessage", message => {
    let template = $("#location-message-template").html();
    let html = Mustache.render(template, {
        url: message.url,
        from: message.from,
        at: moment().format("h:mm a")
    });
    $("#messages").append(html);
})

// event emitter
//3rd argument: callback function that's triggered when acknowledgement arrives
let textField = $('[name=message]')
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
    locationBtn.attr("disabled", "disabled").text("Sending location...");
    if(!navigator.geolocation) {
        return alert("Geolocation not supported by your browser.");
    }
    else {
        //geoloaction enabbled
        //2nd callback function for error handling
        navigator.geolocation.getCurrentPosition((position) => {
            console.table(position);
            locationBtn.removeAttr("disabled").text("Share location");
            socket.emit("createLocationMessage", {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            }); 
        }, () => {
            locationBtn.removeAttr("disabled").text("Share location");
            alert("Unable to get location");
        });
    }
});