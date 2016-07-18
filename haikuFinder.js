var fs = require('fs');
var outsideText = './macbeth.txt';
var haiku = require('./haiku');

var syllablesArray = haiku.syllableOrganizer(haiku.dictionary);

function textToArray(file){
  var wordObj = {};

  // turns text into Buffer
  var fileBuffer = fs.readFileSync(file);

  // typecasts buffer to String, replaces newlines & carriage returns with spaces
  // also replace all punctuation
  var wordArray = fileBuffer.toString().replace(/[\n\r]/g, " ").replace(/[\?,.\-&:;]/g, '').split(' ');

  // remove all empty spaces left over in wordArray
  wordArray = wordArray.filter(function(index){

      return index !== '';

  });

  var upperArray = wordArray.map(function(index){
    return index.toUpperCase();
  });

  return upperArray;
}


// scours for given word in array where array[n] stores all words from CMUdict.txt with n syllables

function findSyllableCount(word, syllaArray){
  var count = 0;

  for (var syllable = 0; syllable < syllaArray.length; syllable++){

    // checks that syllables array isn't empty (as in the case of 10, 13 syllable words)
    if (syllaArray[syllable] !== undefined){

      // stores # of syllables in word based on index of element where word is found
      if (syllaArray[syllable].indexOf(word) > -1){
        count = syllable;
      }
    }
  }
  return count;
}

function haikuScraper(structure, fileArray, syllaArray){
  var textArray = textToArray(fileArray);
  var haikuHolder = [];


  /*return structure.map(function(line){
    return lines.map(function(syllables){

    })
  })*/
  for (var i = start; i < textArray.length; i++){


    console.log(counter);

    if (counter === 5 || findSyllableCount(textArray[i], syllaArray) === 0){
      break;
    }
    haikuHolder.push(textArray[i]);
    haikuHolder.push(findSyllableCount(textArray[i], syllaArray))
    counter += findSyllableCount(textArray[i], syllaArray);
  }

  return haikuHolder;
}

function lineGenerator(syllables, fileArray, syllaArray){
  var arr = [];
  var textArray = textToArray(fileArray);
  var start = Math.floor(Math.random() * textArray.length);
  var syllableCounter = 0;


  for (var i = start; i < textArray.length; i++){
    if (syllableCounter > syllables || findSyllableCount(textArray[i], syllaArray)=== 0){
      console.log("We recurse now")
      return lineGenerator(syllables, fileArray, syllaArray);
    }
    else if (syllableCounter === syllables){
      break;
    }
    else {
      syllableCounter += findSyllableCount(textArray[i], syllaArray);
      arr.push(textArray[i]);
      console.log(syllableCounter);
    }

  }

  return arr;
}

console.log(lineGenerator(5, outsideText, syllablesArray));
//console.log(findSyllableCount('MACBETH', syllablesArray));
//console.log(syllablesArray);
//console.log(textToArray(outsideText));
//console.log(Array.isArray(syllablesArray[1]));
//console.log(matchArrays(outsideText, syllablesArray))
