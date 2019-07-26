var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
//var db = require('./create_mongo_db');

app.get('/', function(req,res){
    res.sendFile(__dirname + '/index.html');
});

app.get('/list', function(req,res){
    res.sendFile(__dirname + '/list.html');
});

app.get('/option', function(req,res){
    res.sendFile(__dirname + '/option.html');
});

io.on('connection', function(socket){
    socket.on('chat message', function(msg){
        io.emit('chat message', msg);
    });
});

http.listen(3000, function(){
    console.log('listening on *:3000');
});