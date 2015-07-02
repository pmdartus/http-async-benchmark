var async = require('async');
var request = require('request');
var config = require('../config.json');

module.exports = function(cb) {
  var start = new Date();
  async.map(config.paths, function(path, cb) {

    request({
      method: "GET",
      uri: path,
      baseUrl: "https://" + config.host,
      pool: {
        maxSockets: 1
      }
    }, cb)

  }, function(err, res) {
    if(err) {
      return cb(err);
    }
    
    var end = new Date();
    return cb(null, end - start);
  });
};


