module.exports = function(apis){
    apis.forEach(function(manifest){
        var apiModule = require(manifest.resolvedPath + '/' + manifest.main);
        if(apiModule.initalize){
            apiModule.initalize();
        }
    });
};