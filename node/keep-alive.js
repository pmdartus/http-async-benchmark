var http = require('https');
var async = require('async');
var config = require('../config.json');
var HttpsAgent = require('agentkeepalive').HttpsAgent;
 
module.exports = function(cb) {
  var keepaliveAgent = new HttpsAgent();
   
  var options = {
    host: config.host,
    method: 'GET',
    agent: keepaliveAgent
  };

  var start = new Date();
  async.map(config.paths, function(path, cb) {
    var option = options;
    option.path = path;

    var req = http.request(option, function (res) {
      return cb(null, res.statusCode);
    });
     
    req.on('error', function (e) {
      return cb(e.message);
    });
    req.end();

  }, function(err, res) {
    if(err) {
      return cb(err);
    }

    var end = new Date();
    return cb(null, end - start);
  });
};