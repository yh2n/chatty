const moment = require('moment');

let generateMessage =  (from, text) => {
    return {
        from,
        text,
        created: moment().format("dddd, MMMM Do, YYYY"),
        at: moment().format("h:mm a")
    };
};

module.exports = { generateMessage };