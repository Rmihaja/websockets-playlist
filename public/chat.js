// making connection
// eslint-disable-next-line no-undef
const socket = io.connect('https://192.168.1.15:443');

// query DOM
const handle = document.querySelector('#handle');
const message = document.querySelector('#message');
const sendBtn = document.querySelector('#send');
const output = document.querySelector('#output');
const feedback = document.querySelector('#feedback');

const sendMessage = () => {
    socket.emit('chat', {
        message: message.value,
        handle: handle.value,
    });
    message.value = '';
    socket.emit('stoppedTyping');
};

// emiting events
sendBtn.addEventListener('click', sendMessage);

message.addEventListener('keydown', event => {
    socket.emit('typing', handle.value);
    if (event.keyCode === 13) return sendMessage();
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
