'use strict';

/**
 * @ngdoc function
 * @name proyecto5App.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the proyecto5App
 */
angular.module('proyecto5App')
  .controller('VoteConcertCtrl', function ($scope, $http) {
  	//$scope.concerts = null;
	$scope.oneAtATime = true;
	$scope.status = {
	    isFirstOpen: true,
	    isFirstDisabled: false
	};

	$http({
			url: "scripts/data/concerts.json",
			method: "GET",
		}).then(function(response) {
			console.log('dentro del response');
			console.log(response.data);
			$scope.concerts = response.data;
	});

	console.log('dentro del general');
	console.log($scope.concerts);

	
});