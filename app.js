var express = require('express') 
  , querystring = require('querystring');

var app = module.exports = express.createServer();

app.get('/', function(req, res) {
	res.send("works");
});

app.post('/', function(req, res) {
	
	var content = '';

	req.on('data', function(chunk){
  		content += chunk;
	});

	req.on('end', function(){
		var message = querystring.decode(content);
		var push = JSON.parse(message['payload']);

		console.log("http://localhost:8080/job/" + push.repository.owner.name + "-" + push.repository.name + "/build?token=TOKEN&branch=" + push.refs);
	});

    res.end();
});
	
app.listen(process.env.PORT || 3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
