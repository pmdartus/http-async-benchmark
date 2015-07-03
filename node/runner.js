'use strict';

var async = require('async');
var utils = require('./utils');
var config = require('../config');

var storeConfigPath = utils.resolvePath(process.argv[2]);
var processTask = require(utils.resolvePath(process.argv[3]));

var start;
async.waterfall([
  function(cb) {
    utils.loadStores(storeConfigPath, cb);
  },
  function (stores, cb) {
    start = new Date().getTime();
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
  var end = new Date().getTime();
  console.log(utils.analyseRes(res, end - start));
});