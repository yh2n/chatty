let socket = io();

//EVENT LISTENER

socket.on('connect', function() {
    console.log("user connected to server");
    //deparam library converts query string into object  ---> https://github.com/AceMetrix/jquery-deparam  
    let params = $.deparam(window.location.search.substring(1));
    console.log(params);
    socket.emit("join", params, function(err) {
        if(err) {
            alert(err);
            window.location.href = '/';
        } else {
            console.log("access granted");
        }
    });

});

socket.on('disconnect', function () {
    console.log('user disconnected from server');
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
    locationBtn.attr("disabled", "disabled").html(`<div class="loader"></div>`);
    if(!navigator.geolocation) {
        return alert("Geolocation not supported by your browser.");
    }
    else {
        //geolocation enabbled
        //2nd callback function for error handling
        navigator.geolocation.getCurrentPosition((position) => {
            console.table(position);
            locationBtn.removeAttr("disabled").html(`<i class="material-icons">location_on</i>`);
            socket.emit("createLocationMessage", {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            }); 
        }, () => {
            locationBtn.removeAttr("disabled").html(`<i class="material-icons">location_off</i>`);
            alert("Unable to get location");
        });
    }
});