var fs = require('fs');
var dictionary = './cmudict.txt';

/*<-------- Haiku Generator Function ------> */

function createHaiku(structure, syllablesArr){
  console.log("this should log a haiku with this structure: " + structure);
  var arrofWords;
  var wordHolder;
  var regex = /(\(\d\))$/;

  // allows for words of random syllable count in each haiku line
  // still abiding by haiku structure

  var randomStructure = haikuScrambler(structure);


  // iterates through each line of haiku
  return randomStructure.map(function(lines){


    // iterates through each element in each haiku line, with elements representing
    // random syllable numbers that add up to the required # of syllables per line
    return lines.map(function(syllables){

      // assign arrays from syllable Array containing words with corresponding # of syllables to arrofWords
      arrofWords = syllablesArr[syllables];

      // returns random word in array containing words with select # of syllables
      wordHolder = arrofWords[Math.floor(Math.random() * arrofWords.length)];
      if (regex.test(wordHolder)){
        wordHolder = wordHolder.replace(regex, "");
      }
      return wordHolder;

    }).join(' ');
  }).join('\n');


}

/* <------- HELPER FUNCTIONS -------> */

// remakes haiku structure array to implement random syllable selection

function haikuScrambler(arr){
  var tempSyllables;
  var syllablesLeft;
  var scrambledArray = [];

  // stores line number of each syllable count so that indices in scrambledArray
  // reflect line number in haiku
  var count = 0;


  arr.forEach(function(lines){

    // makes an array in scrambledArray for each element in input array
  	scrambledArray[count] = [];


    lines.forEach(function(syllables){
    	innerCount = 0;
    	syllablesLeft = syllables;

      // checks that there are still syllables left to randomize
    	while (syllablesLeft > 0){

        // random # of syllables using # of syllables left
    		babySyllable = Math.floor(Math.random() * syllablesLeft) + 1;

        // updates # of syllables left in each line
    		syllablesLeft = syllablesLeft - babySyllable;


    		scrambledArray[count].push(babySyllable);
    	}


    	count++;
    });
  });

  return scrambledArray;
}


// groups words by # of syllables into array such that array[n] only has words
// that have n syllables

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

// sets module.exports to reference custom object that points to createHaiku
// could instead directly set createHaiku as property of module.exports object

module.exports = {
  createHaiku: createHaiku,
  syllableOrganizer: syllableOrganizer,
};
