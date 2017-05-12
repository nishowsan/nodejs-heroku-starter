// main port
var port = 8080;

// core modules
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);

// main function
var users = [];
var connections = [];

app.get('/',function(request,response){
   response.sendFile(__dirname+'/index.html'); 
});

// socket connection
io.sockets.on('connection',function(socket){
    connections.push(socket);
    console.log('Connection : %s users are connected',connections.length);
    socket.on('disconnect',function(data){
        connections.splice(connections.indexOf(socket),1);
        console.log('Disconnect : %s users are connected',connections.length);
    });
    socket.on('send message',function(data){
        console.log(data);
        io.sockets.emit('new message',{msg:data});
    });
});

// executing code
server.listen(port);