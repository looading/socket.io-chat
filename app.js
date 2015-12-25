var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);


app.use(express.static('node_modules/jquery'));
app.get('/',function(req,res){
	res.sendFile(__dirname + '/index.html');

});

var my_i = 0;
io.on('connection',function(socket){
	my_i++;
	socket.on('chat message', function(msg){
	    // console.log('message: ' + msg);
	    io.emit('chat message', msg);
	  });
	console.log(my_i + ' is connected');
	socket.on('disconnect', function () { 
		my_i--;
		console.log(my_i + ' is connected');
	});
});

http.listen(3000,function(){
	console.log('server is running!');
});