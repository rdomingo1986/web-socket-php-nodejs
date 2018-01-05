$(document).ready(function () {
  var socket = io('http://localhost:3000');
  socket.on('connect', function(){
    socket.emit('auth', localStorage.getItem('TOKEN'));
  });

  socket.on('welcome', function(data) {
    alert(data);
  });

  socket.on('message', function (data) {
    alert(data);
  });

  socket.on('disconnect', function(){
    console.log('disconected');
    location.href = "http://localhost/web-client";
  });
});