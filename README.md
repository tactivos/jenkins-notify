#Jenkins Notify - GitHub web-hook awesomeness meets Jenkins coolness
GitHub post-receive-hooks are awesome, they send a lot of information but there isn't an easy way of notifying Jenkins 
about building a given branch, since GitHub fires the hook for every push. 

The idea of this super easy project is to provide some sort of proxy, freely hostable on Heroku, that uses a canonical 
name for Jenkins jobs (inspired on GitHub project naming). 

On the tests you will see that we are using the [sample from docs](http://help.github.com/post-receive-hooks/) hence the 
canonical form for the project (using the sample data) will be 

    defunkt-github-master # => {owner-project-branch}

### Requirements

Proudly built using [node.js](http://nodejs.org) using [npm](http://npmjs.org). You must have a __JENKINS_URL__
environment variable set.

### Meta 

Written by @johnnyhalife for Tactivos under `do the whatever you want license`