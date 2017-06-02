# graduation-project ![Build Status](https://travis-ci.org/majinliang123/graduation-project-web.svg?branch=master)
This is a websit to show the shopping manner through the logs from shopping.

Using Tech:
 1) AngularJS
 2) Bootstrap
 3) jquery
 4) node.js
 5) mongoDB
 6) ElasticSearch
 
 # run the project
 
 ## pre-step:
* the version of node is 6.9.2
* install all the dependencies in folders(container, gui, api/`*`/), you could install by npm or yarn
* have a mongo server
* have a elasticsearch server

the link property is in container/app/config/globalConfig.`*`.json

## run step

* run command "node container/app/coolest.js --env=local", then the project will read config from container/app/config/globalConfig.local.json
* run command "node container/app/coolest.js --env=production", then the project will read config from container/app/config/globalConfig.production.json

# Welcome you pull request and advise
