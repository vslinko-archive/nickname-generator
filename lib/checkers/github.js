var checkPageDoesNotExists = require('../utilities/checkPageDoesNotExists');

function checkGitubAvailable(username, callback) {
  checkPageDoesNotExists('https://github.com/' + username, callback);
}

module.exports = checkGitubAvailable;
