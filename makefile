bundle:
	npm install -d

test:
	./node_modules/.bin/mocha 

test-jenkins:
	rm -rf $(WORKSPACE)/results
	mkdir $(WORKSPACE)/results
	./node_modules/.bin/mocha -R tap  > $(WORKSPACE)/results/results.tap

.PHONY:	test
