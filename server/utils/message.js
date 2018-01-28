const moment = require('moment');

let generateMessage =  (from, text) => {
    return {
        from,
        text,
        created: moment().format("dddd, MMMM Do, YYYY"),
        at: moment().format("h:mm a")
    };
};

let generateLocationMessage =  (from, latitude, longitude) => {
    return {
        from,
        url: `https://google.com/maps?q=${latitude},${longitude}`,
        created: moment().format("dddd, MMMM Do, YYYY"),
        at: moment().format("h:mm a")
    };
};

module.exports = { generateMessage, generateLocationMessage };