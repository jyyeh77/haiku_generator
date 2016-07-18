var fs = require('fs');
var outsideText = './macbeth.txt';
var haiku = require('./haiku');

var syllablesArray = haiku.syllableOrganizer(haiku.dictionary);
var macArray = textToArray(outsideText);

// <------ Haiku Finder Function ------->

function haikuScraper(structure, fileArray, syllaArray){
  var textArray = textToArray(fileArray);
  var haikuHolder = [];
  var randomStart = Math.floor(Math.random() * textArray.length);
  var counter = 0;      // stores current index of haikuHolder

  for (var lines = 0; lines < structure.length; lines++){
    for (var syllables = 0; syllables < structure[lines].length; syllables++){

        // generates phrase that meets syllable limit for 1st haiku line
        // starting at random location in text
        if (lines === 0){
          haikuHolder.push(lineGenerator(randomStart, structure[lines][syllables], fileArray, syllaArray));

        }
        else {

          // retrieves index of last word in haikuHolder line that corresponds with index in textArray
          startIndex = haikuHolder[counter][haikuHolder[counter].length-1];
          counter++;

          // if next line in haiku generated returns false, start haikuScraper again
          if (conditionalLineGenerator(startIndex, structure[lines][syllables], fileArray, syllaArray) === false){

            return haikuScraper(structure, fileArray, syllaArray);
          }

          // if next line in haiku meets syllable criteria, add to haikuHolder
          else {
            haikuHolder.push(conditionalLineGenerator(startIndex, structure[lines][syllables], fileArray, syllaArray));
          }
        }
    }
  }

  // cleans up haikuHolder, removes numbers at end of each element
  for (var i = 0; i < haikuHolder.length; i++){
    haikuHolder[i].splice(haikuHolder[i].length-1, 1, '\n');
  }
  return haikuHolder.join('').replace(/,/g, ' ');
}

// <------- HELPER FUNCTIONS ------->

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

// generates phrases from Macbeth that are of a certain syllable length
// starts over if word isn't in CMUdict.txt (if findSyllableCount returns 0) OR
// if phrase is over the specified syllable count
function lineGenerator(start, syllables, fileArray, syllaArray){
  var arr = [];
  var textArray = textToArray(fileArray);
  var syllableCounter = 0;
  var executed = false;

  // starts in random place in given text
  for (var i = start; i < textArray.length; i++){

    // checks if phrase is over # syllables OR word isn't found in CMUdict
    if (syllableCounter > syllables || findSyllableCount(textArray[i], syllaArray)=== 0){

      // resets starting word in random place in text
      start = Math.floor(Math.random() * textArray.length);
      return lineGenerator(start, syllables, fileArray, syllaArray);
    }
    else if (syllableCounter === syllables){
      // stores index in text as last element of array
      arr.push(i);
      break;
    }
    else {
      
      syllableCounter += findSyllableCount(textArray[i], syllaArray);
      arr.push(textArray[i]);

    }
  }
  return arr;
}

// same as lineGenerator(), but returns false if phrase exceeds syllable limit or
// encounters word not in CMUdictionary, doesn't recurse
function conditionalLineGenerator(start, syllables, fileArray, syllaArray){
  var arr = [];
  var textArray = textToArray(fileArray);
  var syllableCounter = 0;

  // starts in random place in given text
  for (var i = start; i < textArray.length; i++){

    // checks if phrase is over # syllables OR word isn't found in CMUdict
    if (syllableCounter > syllables || findSyllableCount(textArray[i], syllaArray)=== 0){

      return false;
    }
    else if (syllableCounter === syllables){
      arr.push(i);
      break;
    }
    else {
      syllableCounter += findSyllableCount(textArray[i], syllaArray);
      arr.push(textArray[i]);
    }
  }
  return arr;
}

// <----- MAIN ----->

console.log(haikuScraper([[5],[7],[5]], outsideText, syllablesArray));
