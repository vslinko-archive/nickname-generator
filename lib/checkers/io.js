var whoisAvailable = require('whois-available');

function checkIoDomainAvailable(username, callback) {
  whoisAvailable(username + '.io', function(err, response) {
    if (err) {
      return callback(err);
    }

    callback(null, /is available for purchase/i.test(response));
  });
}

module.exports = checkIoDomainAvailable;
