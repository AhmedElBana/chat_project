const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
	console.log('New user connected.');

	socket.emit('newMessage',{
		from: "heshambeh@gmail.com",
		text: "Hey. what is going on.",
		createAt: "2018-4-19 12:52:30"
	});

	socket.on('createMessage', (newMessage) => {
		console.log(newMessage);
	});

	socket.on('disconnect', () => {
		console.log('User was disconnected.');
	});
});

server.listen(port,() => {
    console.log(`Server is up on port ${port}`);
});