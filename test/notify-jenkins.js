var gently = global.GENTLY = new (require('gently'))
  , notify = require('../lib/notify-jenkins.js') 
  , events = require('events')
  , github = require('./utils/github.js');

describe("Jenkins-Notify public API", function(){ 
	describe("GET /", function(){
		it("should return 200 when requesting the default route (ping)", function(){
			var response = { statusCode: 500 };
			
			// setup 
			gently.expect(response, 'send', function(payload){
				payload.should.equal('OK');
			});
			
			// test
			notify.default({}, response);

			// assert
			gently.verify();
			response.statusCode.should.equal(200);
		});
	});

	describe("POST /", function() {
		it("should handle the POST sent by GitHub in an async fashion, and then invoke Jenkins job", function(done){	
			var req = new MockRequest();
			var res = new Object();

			gently.expect(gently.hijacked.request, "get", function(content){
				var expectedUrl = process.env.JENKINS_URL + "/job/defunkt-github-master/build";
				if(process.env.API_TOKEN) expectedUrl += ("?token=" + process.env.API_TOKEN);
				content.should.equal(expectedUrl);
				return this;
			});

			gently.expect(gently.hijacked.request, "pipe", function(pipe){
				pipe.should.equal(res);
				done();
			});

			notify.send(req, res);

			// Raise the received data using a sample GitHub hook from it's Web Page
			req.emit('data', github.sampleRequest());

			// Raise the request completed event
			req.emit('end');

			// assert
			gently.verify();
		});
	});
});


function MockRequest() {
	 events.EventEmitter.call(this);
}

MockRequest.super_ = events.EventEmitter;

MockRequest.prototype = Object.create(events.EventEmitter.prototype, {
    constructor: {
        value: MockRequest,
        enumerable: false
    }
});
