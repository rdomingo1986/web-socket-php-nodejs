var app = require('express')();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var mysql      = require('mysql');
var jwt = require('jwt-simple');
var secret = 'example_key';

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '12345678',
  database : 'test_sockets'
});

app.get('/endpoint', function (req, res) {
  io.emit('message', 'Esto es un mensaje de envio por socket');
  res.json({
    response: true
  })
});

io.on('connection', function(socket){
  console.log('Client connected to socket with id ' + socket.id);

  socket.on('auth', function (token) {
    try {
      jwt.decode(token, secret);
      console.log('Permitido');
      connection.connect();
 
      connection.query('SELECT jwt_string FROM users WHERE jwt_string = "' + token +'"', function (error, results, fields) {
        if (error) throw error;
        if(results.length == 0) {
          console.log(socket.id + ' disconnected');
          socket.disconnect();
        } else {
          socket.emit('welcome', 'Bienvenido al sistema');
        }
      });
    
      connection.end();
    } catch (error) {
      console.log(socket.id + ' disconnected');
      socket.disconnect();
    }
      
    
  });

  socket.on('disconnect', function () {
    console.log('Se desconecto el cliente ');
  });
});

server.listen(3000, function (error) {
  if(error) return console.log(error);
  console.log('Connected to 3000 port');
});