const express = require('express');

const app = express()

app.get('/', (req, res, next) => {
    res.send('Hello world from Ratheesh');
});

app.listen('3000', () => console.log("App listening on port 3000"));