'use strict';

var fs = require('fs');
var util = require('util');
var path = require('path');

var config = require('../config');

var SEARS_PATTERN = "http://www.searsoutlet.com/d/store.jsp?store=%s&cid=0&ps=50";

var resolvePath = function(relPath) {
  var execPath = process.cwd();
  return path.normalize(execPath + '/' + relPath);
};

var loadStore = function(path, cb) {
  var options = {
    encoding: 'UTF-8'
  };

  fs.readFile(path, options, function (err, data) {
    if(err) {
      return cb(err);
    }

    var stores = data.split('\n');
    if(config.iterations) {
      stores = stores.slice(0, config.iterations);
    }

    stores = stores.map(function(store) {
      var parsed = JSON.parse(store);
      parsed.url = util.format(SEARS_PATTERN, parsed.store_id);
      return parsed;
    });

    cb(null, stores);
  });
};

var analyseRes = function(times, total) {
  var sum = times.reduce(function(sum, value){
    return sum + value;
  }, 0);
   
  var avg = sum / times.length;
  return {
    requestsNumber: times.length,
    totalTimePerSec: total / 1000,
    numberRequestPerSec: (times.length / total)  * 1000,
    max: Math.max.apply(null, times),
    min: Math.min.apply(null, times),
    avg: avg,
  };
};

module.exports = {
  loadStores: loadStore,
  resolvePath: resolvePath,
  analyseRes: analyseRes
};