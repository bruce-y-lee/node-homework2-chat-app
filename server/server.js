const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message');
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

    // socket.emit('newMessage', {
    //   from: 'server',
    //   text: 'this is message test',
    //   createdAt: new Date().getTime()
    // });


//socket.emit from Admin text welcome to the chat app


    socket.emit('newMessage', generateMessage('Admin','Welcome to the chat'));

//socket.broadcast.emit from Admin text New user joined
    socket.broadcast.emit('newMessage',generateMessage('Admin', 'New user joined'));

    socket.on('createMessage', (message, callback)=>{
      console.log(message);
      //send message all client and server
      io.emit('newMessage', generateMessage(message.from,message.text));
      callback('This is from the server'); //acknowledgement

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
