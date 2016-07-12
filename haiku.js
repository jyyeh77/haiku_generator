var fs = require('fs');
var dictionary = './cmudict.txt';


function createHaiku(structure){
  console.log("this should log a haiku with this " + structure);

}

function syllableOrganizer(file){

  var wordsAndSyllablesArray = dictionaryToArray(dictionary);
  var regex = /[^0-9]/g;
  var wordObj = {};
  var syllableArray = [];

  wordsAndSyllablesArray.forEach(function(index){

    // checks that word has syllables
    if (/\d+/g.test(index[1])){

      // assigns key:value pair as word: # of syllables
      wordObj[index[0]] = index[1].replace(regex, "").length;
    }
  });

  // creates an array for corresponding to each possible # of syllables inside syllableArray
  for (var key in wordObj){
    syllableArray[wordObj[key]] = [];
  }

  // groups words based on # of syllables, all 1 syllable words go into syllableArray[1] etc..
  for (var key in wordObj){
    syllableArray[wordObj[key]].push(key);
  }
  return syllableArray;
}

function dictionaryToArray(file){

  var wordSyllableArray = [];

  // turns text into Buffer object
  var dictionaryTxt = fs.readFileSync(file);

  // typecasts buffer to String and then converts into array delimited by line breaks
  var wordArray = dictionaryTxt.toString().split('\n');

  // Separates each string element in wordArray into an array with first element
  // as the word, second element as the syllables
  wordArray.forEach(function(index){
    wordSyllableArray.push(index.split('  '));
  });

  return wordSyllableArray;

}

syllableOrganizer(dictionary);


// sets module.exports to reference custom object that points to createHaiku
// could instead directly set createHaiku as property of module.exports object

module.exports = {
  createHaiku: createHaiku,
};
