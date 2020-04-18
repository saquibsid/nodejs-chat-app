var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io=require('socket.io').listen(server);


users=[];
connections=[];

server.listen(3000);    
console.log('server listening on 3000');
app.use(express.static('public'));
app.get('/',function(req,resp){
    resp.sendFile(__dirname + '/index.html');
});

io.sockets.on('connection',function (socket) {
    connections.push(socket);
    console.log('connected : %s socket connected',connections.length);

    socket.on('chat msg',function (msg) {
        //console.log(msg);
        io.emit('chat from server',msg);
    });

    socket.on('typing',function () {
        socket.broadcast.emit('typing from server');
    })

    socket.on('disconnect',function(data){
        connections.splice(data.indexOf(socket),1);
        console.log('Disconnect: %s socket disconnected',connections.length);
    });


});