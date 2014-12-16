var request = require('request');

function checkPageDoesNotExists(url, callback) {
  request(url, function(err, res) {
    if (res.statusCode === 200) {
      callback(null, false);
    } else if (res.statusCode === 404) {
      callback(null, true);
    } else {
      callback(new Error('Unexprected status code for ' + url + ': ' + res.statusCode));
    }
  });
}

module.exports = checkPageDoesNotExists;
