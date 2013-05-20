
/**
 * Module dependencies.
 */

var express = require('express'),
    routes  = require('./routes'),
    port = 8000,
    app = module.exports = express.createServer();

// Configuration

  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));

//app.engine('jade', require('jade').__express);
app.get("/", function(req, res){
    res.render("index");
});
var io = require('socket.io').listen(app.listen(port));
io.sockets.on('connection', function (socket) {
	//console.log("**********" + io.sockets.clients().length)
    socket.emit('message', { message: 'welcome to the chat'});
    
    io.sockets.emit('count', {count: io.sockets.clients().length});
    socket.on('disconnect', function () {
    io.sockets.emit('count', {count: io.sockets.clients().length});
  	});
    socket.on('send', function (data) {
    	console.log(data);
        io.sockets.emit('message', data);
    });
});

console.log("server runing on port " + port);
