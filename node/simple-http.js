'use strict';

var async = require('async');
var request = require('request');
var utils = require('./utils');
var config = require('../config');

var storeConfigPath = utils.resolvePath(process.argv[2]);

var processTask = function(task, cb) {
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

async.waterfall([
  function(cb) {
    utils.loadStores(storeConfigPath, cb);
  },
  function (stores, cb) {
    var times = [];
    var q = async.queue(processTask, config.currency);

    q.drain = function() {
      cb(null, times);
    };
    
    q.push(stores, function(err, res) {
      times.push(res);
    });
  }
], function(err, res) {
  console.log(utils.analyseRes(res));
});

