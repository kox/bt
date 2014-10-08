'user strict';

/**
 * Class Parse
 * @constructor
 * @param {string} phrase - String to operate.
 */
var Parse = function(phrase) {
  this.comas = 0;
  this.fullstops = 0;
  this.fullstops = 0;
  this.contwords = 0;
  this.words = new Array();
  this.phrase = '';
  
  // Once init all variables, we set the phrase, 
  this.setPhrase(phrase);

  // And we execute the parse
  this.do();
}


/** This method creates the array of items */
Parse.prototype.setWords = function() {
  var i = 0;
  var j = 0;
  var character;
  var exists;
  var newWord;

  // Remove spaces in borders and split in an array by spaces
  var splitWords = this.phrase.trim().split(/[ ]+/);

  // Count the number of words
  this.contwords = splitWords.length;

  // For each word
  for (i; i < splitWords.length; i++) {
  	newWord = {};
  	exists = false;
  	j = 0;
    
    // Save the key
    character = splitWords[i].charAt(0);

    // If doesnt exists, we create an array associative for that key
    if (this.words[character] === undefined) {
      this.words[character] = [];
    }

    // For each word with that key we compare if already exists, if yes we plus the counter and exit of for 
    for(j; j < this.words[character].length; j++) {
      if (this.words[character][j].word === splitWords[i]) {
      	this.words[character][j].count++;
      	j = this.words[character].length;
      	exists = true;
      }
    }

    // If its the first time, we create an object with counter equal 1
    if (!exists) {
      newWord = {
      	count: 1,
      	word: splitWords[i]
      };

      // We add the object into the associative array
      this.words[character].push(newWord);
    }
  }
}

/** This function clean the phrase of anything else alphabet or spaces. */
Parse.prototype.cleanPhrase = function() {
  this.phrase = this.phrase.replace(/[^\w\s]/gi, '');
  this.phrase = this.phrase.replace(/[\n]/gi, ''); // remove new lines
}


/** This method checks if exists any number in the phrase and return true or false */
Parse.prototype.hasNumbers = function(phrase) {
  var regex = /\d/;

  return regex.test(phrase);	
}

/** This method count the number of times a character is in the phrase and then they are removed */ 
Parse.prototype.countAndRemove = function(character) {
  var replace = '/' + character + '/'; 
  var count = this.phrase.split(character).length-1;

  if (count) {
    if (character === ',') {
      this.comas = count;
    } else if (character === '.') {
      this.fullstops = count;
    }
  }

  this.phrase = this.phrase.replace(replace,'');
}

/** This method check if the phrase has min/max number of words, has numbers, if everything ok then it's saved in class */
Parse.prototype.setPhrase = function(phrase) {
  // 5  words,  a  maximum  of  500  words
  if (phrase.length < 5 || phrase.length > 500) {
    throw "Paragraghs are not between 5 and 500 characters";
  }

  if (this.hasNumbers(phrase)) {
  	throw "Paragraghs can't contain any number";
  }

  this.phrase = phrase;
}

/** Method which executes the parse */
Parse.prototype.do = function() {
  this.countAndRemove(',');
  this.countAndRemove('.');
  this.cleanPhrase();

  this.setWords();
}

/** Method to return the counters */ 
Parse.prototype.getResults = function() {
  return {
    comas: this.comas,
    fullstops: this.fullstops,
    contwords: this.contwords
  };
}

/** Method to return the list of words */
Parse.prototype.getWords = function() {
  return this.words; 
}