// making connection
const socket = io.connect('http://localhost:3000');

// query DOM
const handle = document.querySelector('#handle');
const message = document.querySelector('#message');
const sendBtn = document.querySelector('#send');
const output = document.querySelector('#output');
const feedback = document.querySelector('#feedback');

// emiting events
sendBtn.addEventListener('click', () => {
    socket.emit('chat', {
        message: message.value,
        handle: handle.value,
    });
});

message.addEventListener('keydown', () => {
    socket.emit('typing', handle.value);
});

message.addEventListener('blur', () => {
    socket.emit('stoppedTyping');
});

// listening for events
socket.on('chat', data => {
    output.innerHTML += `<p><strong>${data.handle}:</strong> ${data.message}</p>`;
});

socket.on('typing', data => {
    feedback.innerHTML = `<p><em>${data} is typing...</em></p>`;
});

socket.on('stoppedTyping', () => {
    feedback.innerHTML = '';
});
