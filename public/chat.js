/**
 * @author Sachintha
 */
$(document).ready(function(){
	
	var messages = [];
    var socket = io.connect('http://localhost');
   
    socket.on('message', function (data) {
        if(data.message) {
            messages.push(data);
            var html = '';
            for(var i=0; i<messages.length; i++) {
                html += '<b>' + (messages[i].username ? messages[i].username : 'Server') + ': </b>';
                html += messages[i].message + '<br />';
            }
            $("#content").html(html);
        } else {
            console.log("There is a problem:", data);
        }
    });
    
    socket.on('count', function (data) {
        if(data.count) {
            $("#count").html(data.count + ' user(s) online');
        } else {
            console.log("There is a problem:", data);
        }
    });
 
 	$("#field").keyup(function(e) {
        if(e.keyCode == 13) {
            sendMessage();
        }
    });
    
    $("#send").click(function() {
    	sendMessage();
    });	
	
	function sendMessage() {
		if(! $("#name").val()) {
            alert("Please type your name!");
        }else{
        var text = field.value;
        socket.emit('send', { message: text, username: $("#name").val() });
        $("#field").val('');	
        }
        
	}
})
    
 
