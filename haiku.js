var fs = require('fs');
var dictionary = './cmudict.txt';


function createHaiku(structure){
  console.log("this should log a haiku with this " + structure);

}

function parseDictionary(file){

  var wordsAndSyllablesArray = dictionaryToArray(dictionary);
  var regex = /[^0-9]/g;
  var wordObj = {};

  wordsAndSyllablesArray.forEach(function(index){

    // checks that word has syllables
    if (/\d+/g.test(index[1])){

      // assigns key:value pair as word: # of syllables
      wordObj[index[0]] = index[1].replace(regex, "").length;
    }
  });
  
  console.log(wordObj);
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

parseDictionary(dictionary);


// sets module.exports to reference custom object that points to createHaiku
// could instead directly set createHaiku as property of module.exports object

module.exports = {
  createHaiku: createHaiku,
};
