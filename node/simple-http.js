'use strict';

var request = require('request');

module.exports = function(task, cb) {
  var start = new Date().getTime();
  request({
    method: "GET",
    uri: task.url,
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
