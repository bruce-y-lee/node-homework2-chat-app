const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');


const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

// console.log(__dirname + '../public');
// console.log(publicPath);

// app.use(express.static(publicPath));
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();


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




    socket.on('join',(params,callback)=>{

      if(!isRealString(params.name) || !isRealString(params.room)){
        callback('Name and room name are required')
      }

      socket.join(params.room);
      users.removeUser(socket.id);
      users.addUser(socket.id, params.name, params.room);

      io.to(params.room).emit('updateUserList', users.getUserList(params.room));

      // socket.leave('room2')

      //io.emit -> everyone io.to('room2')
      //socket.broadcast everyone except itself -> socket.broadcast.to('room2')
      // socket.emit -> socket.emit('room2')


      socket.emit('newMessage', generateMessage('Admin','Welcome to the chat'));
      //socket.broadcast.emit from Admin text New user joined
      // socket.broadcast.emit('newMessage',generateMessage('Admin', 'New user joined'));
      socket.broadcast.to(params.room).emit('newMessage',generateMessage('Admin', `${params.name} has joined`));

      callback();
    })

    socket.on('createMessage', (message, callback)=>{
      console.log(message);
      //send message all client and server
      io.emit('newMessage', generateMessage(message.from,message.text));
      callback(); //acknowledgement

    });

    socket.on('createLocationMessage', (coords)=>{
      // io.emit('newMessage', generateMessage('Admin',`${coords.latitude},${coords.longitude}`));
      io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude ,coords.longitude));
    });

    socket.on('disconnect',()=>{
      // console.log('User was disconnected');
      var user = users.removeUser(socket.id);

      if(user){
        io.to(user.room).emit('updateUserList', users.getUserList(user.room));
        io.to(user.room).emit('newMessage',generateMessage('Admin',`${user.name} has left.`));
      }
    })
})


server.listen(port,()=>{
     console.log(`Server is up on port ${port}`);
})
// app.listen(port,()=>{
//   console.log(`Server is up on port ${port}`);
// });
