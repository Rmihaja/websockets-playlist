// making connection
const socket = io.connect('http://localhost:3000');

// query DOM
const handle = document.querySelector('#handle');
const message = document.querySelector('#message');
const sendBtn = document.querySelector('#send');
const output = document.querySelector('#output');

// emiting events
sendBtn.onclick = () => {
    socket.emit('chat', {
        message: message.value,
        handle: handle.value,
    });
};

// listening for events
socket.on('chat', data => {
    output.innerHTML += `<p><strong>${data.handle}:</strong> ${data.message}</p>`;
});
