var socket = io();

socket.on('connect', function() {
    console.log('Connected to Server');


    // socket.emit('createMessage', {
    //   from: 'client',
    //   text: 'test message from client',
    //   createdAt: new Date().getTime()
    // })

});

socket.on('newMessage', function(newMessage) {
  console.log(newMessage);
})
socket.on('disconnect', function() {
  console.log('Disconnected from server');
})
//
// socket.on('newEmail',function(email) {
//   console.log('New email', email);
// })
