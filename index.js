const {BUGSNAG_API_KEY,SERVER} =require('config');
const express=require('express');
const bugsnag=require('bugsnag');
const socket = require('socket.io');

//BUGSNAG COMPONENTS
bugsnag.register(BUGSNAG_API_KEY, { appVersion: 1 });
bugsnag.notify(new Error('Test error'));

//EXPRESS COMPONENTS
app=express(),
port=process.env.PORT||SERVER.PORT;

//PATH TO THE ROUTING FOLDER
var routes=require('./routes/monitorRoutes');

//CSS
app.use(express.static(__dirname +'/public'));
//HTML
app.use(express.static(__dirname + '/views'));

//go to the HTML file after getting a connectio to the server
app.get('/', function(req,res){
    res.sendFile("index.html");
});

app.use('/api/ibct',routes);

var server=app.listen(port,function(){
	console.log("APP is running on "+SERVER.HOST +":"+port); 
    //console.log(io());
});

var io=socket(server);
//var socket = io.connect('http://211.195.229.79:4000');
//Whenever someone connects this gets executed
io.on('connection', function(socket) {
    console.log('socket connected');
 
    //Whenever someone disconnects this piece of code executed
    socket.on('disconnect', function () {
       console.log('socket disconnected');
    });
});