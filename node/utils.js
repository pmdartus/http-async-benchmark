'use strict';

var fs = require('fs');
var path = require('path');

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
    stores = stores.map(function(store) {
      return JSON.parse(store);
    });

    cb(null, stores);
  });
};

module.exports = {
  loadStores: loadStore,
  resolvePath: resolvePath
};