var request = require('request');
var async = require('async');
var exec = require('child_process').exec;

function checkDotComDomain(username, callback) {
  exec('whois ' + username + '.com', function(err, stdout, stderr) {
    if (err) {
      return callback(err);
    }

    callback(null, /No match for/i.test(stdout));
  });
}

function check(username, callback) {
  async.parallel({
    twitter: checkTwitter.bind(null, username),
    github: checkGitub.bind(null, username),
    // dotComDomain: checkDotComDomain.bind(null, username),
    dotIoDomain: checkDotIoDomain.bind(null, username)
  }, callback);
}

var ac = 'euoia';
var bc = 'qwrtypsdfghjklzxcvbnm';
var usernames = [];

for (var ca = 0; ca < ac.length; ca++) {
for (var cb = 0; cb < bc.length; cb++) {
for (var cc = 0; cc < ac.length; cc++) {
for (var cd = 0; cd < bc.length; cd++) {
for (var ce = 0; ce < ac.length; ce++) {
for (var cf = 0; cf < bc.length; cf++) {
  var username = [ac[ca], bc[cb], ac[cc], bc[cd], ac[ce], bc[cf]].join('');
  usernames.push(username);
}
}
}
}
}
}
function shuffle( array ) {	// Shuffle an array
	//
	// +   original by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)

	for(var j, x, i = array.length; i; j = parseInt(Math.random() * i), x = array[--i], array[i] = array[j], array[j] = x);
	return true;
}
shuffle(usernames);

console.log([
  'username',
  'error',
  'twitter',
  'github',
  // 'dotComDomain',
  'dotIoDomain'
].join(';'));

async.eachSeries(usernames, function(username, callback) {
  check(username, function(err, result) {
    console.log([
      username,
      !!err,
      result ? result.twitter : '',
      result ? result.github : '',
      // result ? result.dotComDomain : '',
      result ? result.dotIoDomain : ''
    ].join(';'));
    callback();
  });
}, function(err) {});
