bundle:
	npm install -d

test: bundle
	./node_modules/.bin/mocha 

.PHONY:	test