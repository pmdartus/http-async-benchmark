var async = require('async');
var request = require('request');
var utils = require('./utils');

var storeConfigPath = utils.resolvePath(process.argv[2]);
utils.loadStores(storeConfigPath, function(err, stores) {
  
});

