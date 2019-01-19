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
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var template = jQuery('#message-template').html();
  var html = Mustache.render(template,{
    text: message.text,
    from: message.from,
    createdAt: formattedTime
  });

  jQuery('#messages').append(html);

//using jQuery
  // var li = jQuery('<li></li>');
  // li.text(`${message.from} ${formattedTime}: ${message.text}`);
  //
  // jQuery('#messages').append(li);

})
socket.on('disconnect', function() {
  console.log('Disconnected from server');
});

socket.on('newLocationMessage', function(message){
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var template = jQuery('#location-message-template').html()
  var html = Mustache.render(template, {
    from: message.from,
    createdAt: formattedTime,
    url: message.url
  })

  jQuery('#messages').append(html);
  // var li = jQuery('<li></li>');
  // var a = jQuery('<a target = "_blank">My current location</a>');
  // // var a = jQuery('<a>My current location</a>');
  // console.log("newLocationMessage",message.from, message.url);
  // li.text(`${message.from} ${formattedTime}: `);
  // a.attr('href', message.url);
  //
  // li.append(a);
  // jQuery('#messages').append(li);
})


jQuery('#message-form').on('submit', function(e) {
  e.preventDefault();
  var messageTextbox = jQuery('[name=message]');
  socket.emit('createMessage',{
    from: 'User',
    text: messageTextbox.val()
  },function(){ //acknowledgement
    messageTextbox.val('');
  });
});

var locationButton = jQuery('#send-location');
// jQuery('#locationButton').on
locationButton.on('click', function(){
  if(!navigator.geolocation){
    return alert('Geolocation not supported by your browser')
  }
  locationButton.attr('disabled', 'disabled').text('Sending location...');
  navigator.geolocation.getCurrentPosition(function(position) {
    locationButton.removeAttr('disabled').text('Send location');
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
    // console.log(position.coords.longitude);
  }, function(){
    // console.log(e);
    locationButton.removeAttr('disabled').text('Send location');
    alert('Unable to fetch location.')
  })
})
//
// socket.on('newEmail',function(email) {
//   console.log('New email', email);
// })
