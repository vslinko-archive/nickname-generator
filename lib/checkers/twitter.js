var checkPageDoesNotExists = require('../utilities/checkPageDoesNotExists');

function checkTwitterAvailable(username, callback) {
  checkPageDoesNotExists('https://twitter.com/' + username, callback);
}

module.exports = checkTwitterAvailable;
