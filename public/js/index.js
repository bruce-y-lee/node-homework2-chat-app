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

socket.on('newLocationMessage', function(message){
  var li = jQuery('<li></li>');
  var a = jQuery('<a target = "_blank">My current location</a>');
  // var a = jQuery('<a>My current location</a>');
  console.log("newLocationMessage",message.from, message.url);
  li.text(`${message.from}: `);
  a.attr('href', message.url);

  li.append(a);
  jQuery('#messages').append(li);
})


jQuery('#message-form').on('submit', function(e) {
  e.preventDefault();

  socket.emit('createMessage',{
    from: 'User',
    text: jQuery('[name=message]').val()
  },function(){ //acknowledgement

  });
});

var locationButton = jQuery('#send-location');
// jQuery('#locationButton').on
locationButton.on('click', function(){
  if(!navigator.geolocation){
    return alert('Geolocation not supported by your browser')
  }

  navigator.geolocation.getCurrentPosition(function(position) {
    // console.log(position.coords.latitude);
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
    // console.log(position.coords.longitude);
  }, function(){
    // console.log(e);
    alert('Unable to fetch location.')
  })
})
//
// socket.on('newEmail',function(email) {
//   console.log('New email', email);
// })
