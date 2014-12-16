var path = require('path');
var fs = require('fs');

var knownCheckers = fs.readdirSync(path.join(__dirname, '..', 'checkers'))
  .map(function(file) {
    return file.replace(/\.js$/, '');
  });

module.exports = knownCheckers;
