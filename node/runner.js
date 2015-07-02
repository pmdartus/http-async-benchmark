var async = require('async');

var config = require('../config');
var keepAlive = require('./keep-alive');
var simple = require('./simple-http');


var extractMetrics = function(name, times) {
  var sum = times.reduce(function(sum, value){
    return sum + value;
  }, 0);
   
  var avg = sum / times.length;
  return {
    name: name,
    max: Math.max.apply(null, times),
    min: Math.min.apply(null, times),
    avg: avg,
  }
};

var run = function(name, fun, cb) {
  console.log("Running", name);
  var counter = 0;
  var times = [];

  async.until(
    function() {
      return counter >= config.iteration;
    },
    function(cb) {
      counter++;
      fun(function(err, time) {
        if(err) {
          return cb(err);
        }
        times.push(time);
        cb(null);
      });
    }, function(err, res) {
      console.log(res);
      cb(null, extractMetrics(name, times));
    });
}

async.series([
  function(cb) {
    run("Simple", simple, cb);
  },
  function(cb) {
    run("Keep Alive", keepAlive, cb);
  }
], function (err, res) {
  console.log(res);
});