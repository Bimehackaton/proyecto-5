'use strict';

/**
 * @ngdoc function
 * @name proyecto5App.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the proyecto5App
 */
angular.module('proyecto5App')
  .controller('CarCtrl', function ($scope) {
  	$scope.map = {
  	  center: {
		latitude: 45,
		longitude: -73
	  },
	  zoom: 8
	};
  });