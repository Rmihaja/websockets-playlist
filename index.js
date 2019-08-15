const express = require('express');

// setting app
const app = express();
const server = app.listen(3000, () => {
    console.log('app now listen on port 3000');
});

// static files
app.use(express.static('public'));
