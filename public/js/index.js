var socket = io();

socket.on('connect', function() {
    console.log('Connected to Server');


    // socket.emit('createMessage', {
    //   from: 'client',
    //   text: 'test message from client',
    //   createdAt: new Date().getTime()
    // })

});

socket.on('newMessage', function(message) {
  console.log(message);
  var li = jQuery('<li></li>');
  li.text(`${message.from}: ${message.text}`);

  jQuery('#messages').append(li);

})
socket.on('disconnect', function() {
  console.log('Disconnected from server');
});

// socket.emit('createMessage', {
//   from: 'Frank',
//   text: 'Hi'
// }, function(data) { //acknowledgement
//   console.log('Got it', data);
// })


jQuery('#message-form').on('submit', function(e) {
  e.preventDefault();

  socket.emit('createMessage',{
    from: 'User',
    text: jQuery('[name=message]').val()
  },function(){ //acknowledgement

  })
});
//
// socket.on('newEmail',function(email) {
//   console.log('New email', email);
// })
