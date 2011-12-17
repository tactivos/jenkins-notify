var express = require('express') 
  , notify = require('./lib/notify-jenkins');

/**
* Configures the express application
*/
var app = module.exports = express.createServer();

/**
* Handles the get to the root of the site, the only purpose of this route
* is to have a way of understanding if the service is up or down. (consider it as PING)
*/
app.get('/', notify.default);

/**
* Handles the GitHub sent HTTP POST Hook for more information on how to configure this 
* and or how to configure it at http://help.github.com/post-receive-hooks/.
*/
app.post('/', notify.send);
	
app.listen(process.env.PORT || 3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
