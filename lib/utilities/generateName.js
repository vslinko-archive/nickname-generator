var path = require('path');
var fs = require('fs');

var chars = 'abcdefghijklmnopqrstuvwxyz'.split('');

var words = fs.readFileSync(path.join(__dirname, '2of12full.txt'))
  .toString()
  .trim()
  .split('\n')
  .map(function(row) {
    return row.replace(/^\s*[^\s]+\s+[^\s]+\s+[^\s]+\s+[^\s]+\s+/, '').toLowerCase();
  });

var pairs = words
  .reduce(function(pairs, word) {
    for (var i = 0; i < word.length - 1; i++) {
      if (chars.indexOf(word[i]) < 0 || chars.indexOf(word[i+1]) < 0) {
        return pairs;
      }

      var pair = word[i] + word[i+1];

      if (!pairs[pair]) {
        pairs[pair] = 0;
      }
      pairs[pair]++;
    }
    return pairs;
  }, {});

var pairsLenght = Object.keys(pairs)
  .reduce(function(pairsLenght, pair) {
    pairsLenght += pairs[pair];
    return pairsLenght;
  }, 0);

pairs = Object.keys(pairs)
  .reduce(function(newPairs, pair) {
    newPairs[pair] = pairs[pair] / pairsLenght;
    return newPairs;
  }, {});

var minChance = 1 / pairsLenght;

var changeChances = chars.map(function(char) {
  return chars.map(function(nextChar) {
    return pairs[char + nextChar] || minChance;
  });
});

var startChars = words
  .reduce(function(startChars, word) {
    var char = word[0];
    if (chars.indexOf(word[0]) < 0) {
      return startChars;
    }

    if (!startChars[char]) {
      startChars[char] = 0;
    }

    startChars[char]++;

    return startChars;
  }, {});

var startCharsLength = Object.keys(startChars)
  .reduce(function(startCharsLength, char) {
    startCharsLength += startChars[char];
    return startCharsLength;
  }, 0);

startChars = Object.keys(startChars)
  .reduce(function(newStartChars, pair) {
    newStartChars[pair] = startChars[pair] / startCharsLength;
    return newStartChars;
  }, {});

var minStartChance = 1 / startCharsLength;

var startChances = chars.map(function(char) {
  return startChars[char] || minStartChance;
});

function selectByChances(changes, minChance) {
  var indexes;
  var rnd;

  do {
    do {
      rnd = Math.random();
    } while(rnd < minChance);

    indexes = changes
      .map(function(chance, index) {
        return [chance, index];
      })
      .filter(function(chance) {
        return rnd < chance[0];
      })
      .map(function(chance) {
        return chance[1];
      });
  } while (indexes.length === 0);

  return indexes[Math.floor(Math.random() * indexes.length)];
}

function generateName(length) {
  length = length || 6;

  var index = selectByChances(startChances, minStartChance);
  var word = chars[index];

  for (var i = 1; i < length; i++) {
    index = selectByChances(changeChances[index], minChance);
    word += chars[index];
  }

  return word;
}

for (var i = 0; i < 1000; i++) {
  // console.log(generateName());
  generateName();
}

module.exports = generateName;
