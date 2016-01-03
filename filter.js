var path = require('path');
var fs = require('fs');

var usernames = fs.readFileSync(path.join(__dirname, 'result.txt')).toString()
  .trim()
  .split('\n')
  .sort();

function shuffle( array ) {// Shuffle an array
  for(var j, x, i = array.length; i; j = parseInt(Math.random() * i), x = array[--i], array[i] = array[j], array[j] = x);
  return true;
}

function getUsernames() {
  var filtered;
  var names = usernames.concat();
  shuffle(names);

  do {
    filtered = names
      .filter(function(username, index) {
        return index === Math.round(Math.random() * usernames.length);
      });
  } while (filtered.length === 0);

  return filtered;
}

function exit() {
  var keys = Object.keys(hash)
    .sort(function(a, b) {
      return hash[a] - hash[b];
    });

  keys
    .slice(0, 5)
    .forEach(function(k) {
      console.log(echo(k), hash[k]);
    });
  console.log('...');
  keys
    .slice(-5)
    .forEach(function(k) {
      console.log(echo(k), hash[k]);
    });
  process.exit(0);
}

var hash = usernames.reduce(function(hash, username) {
  hash[username] = 0;
  return hash;
}, {});
var max = 0;
while (true) {
  var filtered = getUsernames();
  filtered.forEach(function(username) {
    hash[username]++;
    if (hash[username] > max) {
      max = hash[username];
      console.log(max);
    }
    if (max == 33) {
      exit();
    }
  });
}

function echo(username) {
  return [username, username + '.com', '@' + username, 'me@' + username + '.com'].join(' ');
}
