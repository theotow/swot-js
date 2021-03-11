function Swot(cb) {
  var walk = require('walk');
  var fs = require('fs');
  var path = require('path');
  var _ = require('underscore');

  var domains = {};
  var blacklist = ['si.edu', 'america.edu', 'folger.edu'];

  function check(email) {
    var domain = email.split('@').reverse()[0];
    if (blacklist[domain] === undefined && _.has(domains, domain)) {
      return domains[domain];
    } else {
      return false;
    }
  }

  function fixPath(path, basePath) {
    return path
      .replace(basePath + '/', '')
      .split('/')
      .reverse()
      .join('.');
  }

  function init() {
    var basePath = path.resolve(__dirname, '../domains');
    var walker = walk.walk(basePath, {followLinks: false});

    walker.on('file', function (root, stat, next) {
      var domain =
        path.basename(stat.name, '.txt') + '.' + fixPath(root, basePath);

      fs.readFile(root + '/' + stat.name, {encoding: 'utf-8'}, function (
        err,
        data
      ) {
        if (!err) {
          domains[domain] = data;
        }
        next();
      });
    });

    walker.on('end', function () {
      if (cb) cb();
    });
  }

  init();
  return {
    check: check,
  };
}

module.exports = Swot;
