var consonants = 'bcdfghjklmnpqrstvwxyz'.split('');
var vowels = 'aeiou'.split('');
var chars = 'abcdefghijklmnopqrstuvwxyz'.split('');
var bad = 'gjqwxyz'.split('');

function random(chances) {
  return Math.floor(Math.random() * chances * 100) / 100;
}

var changeChances = chars.map(function(char) {
  var charIsVowel = vowels.indexOf(char) >= 0;

  return chars.map(function(nextChar) {
    var nextCharIsVowel = vowels.indexOf(nextChar) >= 0;

    if (bad.indexOf(nextChar) >= 0) {
      return random(0.1);
    } else if (char == nextChar) {
      return random(0.05);
    } else if (charIsVowel && nextCharIsVowel) {
      return random(0.1);
    } else if (charIsVowel && !nextCharIsVowel) {
      return random(0.9);
    } else if (!charIsVowel && nextCharIsVowel) {
      return random(0.9);
    } else {
      return random(0.1);
    }
  });
});

var startChances = chars.map(function(char) {
  var charIsVowel = vowels.indexOf(char) >= 0;

  if (bad.indexOf(char) >= 0) {
    return random(0.1);
  } else if (charIsVowel) {
    return random(0.75);
  } else {
    return random(0.25);
  }
});

function selectByChances(changes) {
  var indexes;

  do {
    indexes = changes
      .map(function(chance, index) {
        return [chance, index];
      })
      .filter(function(chance) {
        return Math.random() < chance[0];
      })
      .map(function(chance) {
        return chance[1];
      });
  } while (indexes.length === 0);

  return indexes[Math.floor(Math.random() * indexes.length)];
}

function generateName(length) {
  length = length || 6;
  var index = selectByChances(startChances);
  var word = chars[index];
  for (var i = 1; i < length; i++) {
    index = selectByChances(changeChances[index]);
    word += chars[index];
  }
  return word;
}

module.exports = generateName;
