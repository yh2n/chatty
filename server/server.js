const path = require('path');
const publicPath = path.join(__dirname, '../public');
const express = require('express');
const app = express();
const { PORT } = require('./config');

app.use(express.static(publicPath));

app.listen(8080, () => {
    console.log(`server is up on port ${PORT}`, )
});