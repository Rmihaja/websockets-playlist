/* eslint-disable no-console */

const express = require('express');
const fs = require('fs');
const https = require('https');
const socketio = require('socket.io');

// setting up app
const app = express();
const options = {
    key: fs.readFileSync('./file.pem'),
    cert: fs.readFileSync('./file.crt'),
};
const serverPort = 443;
const server = https.createServer(options, app);
const io = socketio(server);

// static files
app.use(express.static('public'));

// setting up socket
io.on('connection', socket => {
    console.log('a socket connection was made:', socket.id);

    // handling events
    socket.on('chat', data => {
        io.emit('chat', data);
    });

    socket.on('typing', data => {
        socket.broadcast.emit('typing', data);
    });

    socket.on('stoppedTyping', () => {
        socket.broadcast.emit('stoppedTyping');
    });
});

server.listen(serverPort, () => {
    console.log(`server up and running at port ${serverPort}`);
});
