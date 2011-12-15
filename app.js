var express = require('express');

var app = module.exports = express.createServer();

app.get('/', function(req, res) {
	res.send("works");
});

app.post('/', function(req, res) {
	console.log(req.body);

	res.end();
});
	
app.listen(process.env.PORT || 3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
