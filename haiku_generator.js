
// takes file path as parameter, runs script, then returns that file's module.exports
var haiku = require('./haiku');

// creates array with all words in dictionary grouped by syllable #
var syllablesArr = haiku.syllableOrganizer(haiku.dictionary);


console.log(haiku.createHaiku([[5],[7],[5]], syllablesArr));
