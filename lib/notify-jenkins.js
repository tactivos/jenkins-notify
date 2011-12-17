// Hijacking enabled for Unit Testing
if (global.GENTLY) require = GENTLY.hijack(require);

var querystring = require('querystring')
  ,	request = require('request');

/**
 * Handles the default route, just a ping to make sure that 
 * we are running the application successfuly on Heroku
 */
module.exports.default = function(req, res) {
	res.statusCode = 200;
	res.send('OK');
}

/**
 * Parses the incoming input from GitHub Http Hook, and creates
 * a "build request" fired to Jenkins, constructing the job name in a 
 * cannonical way as "{owner}-{project}-{branch}". 
 *
 * NOTE: The address of Jenkins is acquiered through an environment variable
 * named JENKINS_URL.
 */
module.exports.send = function(req, res) {
	var content = '';

	req.on('data', function(chunk){
  		content += chunk;
	});

	req.on('end', function(){
		if(!process.env.JENKINS_URL)
			throw new Error('we require the JENKINS_URL environment variable to be set');

		var message = querystring.decode(content);
		var push = JSON.parse(message.payload);

		var repository = push.repository.owner.name + "-" + push.repository.name + "-" + push.ref.replace('refs/heads/', '');
		var url = process.env.JENKINS_URL + "/job/" + repository + "/build";

		console.log("Sending request to: " + url);

		request.get(url).pipe(res);
	});
}