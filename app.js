var express = require('express') 
  , request = require('request')
  , querystring = require('querystring');

var app = module.exports = express.createServer();

app.get('/', function(req, res) {
	res.statusCode = 200;
	res.end();
});

app.post('/', function(req, res) {
	
	var content = '';

	req.on('data', function(chunk){
  		content += chunk;
	});

	req.on('end', function(){
		var message = querystring.decode(content);
		var push = JSON.parse(message['payload']);

		
		req.get("http://jenkins.mural.ly/job/" + push.repository.owner.name + "-" + push.repository.name + "-" + push.ref.replace('refs/heads/', '') + "/build")
		   .pipe(res);
	});
});
	
app.listen(process.env.PORT || 3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
