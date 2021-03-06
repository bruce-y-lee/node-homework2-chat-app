const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');


const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

console.log(__dirname + '../public');
console.log(publicPath);

// app.use(express.static(publicPath));
var app = express();
var server = http.createServer(app);
var io = socketIO(server);


app.use(express.static(publicPath));

//on - listen
io.on('connection', (socket) => {
    console.log('New user connected');

    socket.emit('newEmail', {
      from: 'mike@example.com',
      text: 'Hello',
      createdAt: 123
    });

    socket.on('createEmail', (newEmail) => {
      console.log('createEmail', newEmail);
    })

    socket.on('disconnect',()=>{
      console.log('User was disconnected');
    })
})


server.listen(port,()=>{
     console.log(`Server is up on port ${port}`);
})
// app.listen(port,()=>{
//   console.log(`Server is up on port ${port}`);
// });
