'use strict';

var request = require('request');
var Agent = require('agentkeepalive');


var agent = new Agent();

module.exports = function(task, cb) {
  var start = new Date().getTime();
  request(task.url, {
    method: "GET",
    agent: agent,
    headers: {"Connection":"Keep-Alive"}
  }, function(err, res) {
    if(err) {
      console.log(err);
    } else if (res.statusCode !== 200) {
      console.log('ERROR --> ', task.url, res.statusCode);
    }

    var end = new Date().getTime();
    cb(null, end - start);
  });
};
