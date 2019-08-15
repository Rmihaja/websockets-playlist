/* eslint-disable no-console */

const express = require('express');
const socketio = require('socket.io');

// setting up app
const app = express();
const server = app.listen(3000, () => {
    console.log('app now listen on port 3000');
});

// static files
app.use(express.static('public'));

// setting up socket
const io = socketio(server);
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
