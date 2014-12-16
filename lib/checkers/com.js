var whoisAvailable = require('whois-available');

function checkComDomainAvailable(username, callback) {
  whoisAvailable(username + '.com', function(err, response) {
    if (err) {
      return callback(err);
    }

    callback(null, /No match for/i.test(response));
  });
}

module.exports = checkComDomainAvailable;
