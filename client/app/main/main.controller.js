'use strict';

/**
 * Controller to input the data model into the view 
 */
angular.module('btApp')
  .controller('MainCtrl', function ($scope, $http) {
    // Init variables 
    var parse;
    var phrase;
    var words;
    var keys = [];
    var i = 0;
    
    // Include in $scope
    $scope.submited = false;
    $scope.err = '';
    $scope.phrase = '';


    /** Method binded to the submit button */
    $scope.submitPhrase = function () {
      $scope.submited = true;
      $scope.err = '';
      parse = {};
      phrase = $scope.phrase;

      // We try to create the parse class
      try {
      	// Create method
      	parse = new Parse(phrase);

      	// Add counters
      	$scope.solution = parse.getResults();
      	// Add words
      	$scope.solution.words = parse.getWords();
        // Add keys
      	$scope.solution.keys = Object.keys($scope.solution.words);
      	
      } catch(e) {
      	// If err exists, we show in screen
      	$scope.err = e;
      }
    }
  });
