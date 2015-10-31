'use strict';

/**
 * @ngdoc function
 * @name proyecto5App.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the proyecto5App
 */
angular.module('proyecto5App')
  .controller('PerfilCtrl', function ($scope, Facebook, $http) {
  	Facebook.getLoginStatus(function(response) {
       if(response.status !== 'connected') {
       	return
       }
	  	Facebook.api('/me', function(response) {
	  		$scope.user = response;
	       	console.log(response);
	       	$http({
		      url: "https://api.mongolab.com/api/1/databases/project/collections/house",
		      method: "GET",
		      params : {
		      	apiKey : "4fccb901e4b0d43c618156c0",
		      	q : '{"user_id" : "' + $scope.user.id + '"}'
		      }
		    }).then(function(response) {
		    	$scope.myHouses = response.data;
		    });

		    $http({
		      url: "https://api.mongolab.com/api/1/databases/project/collections/car",
		      method: "GET",
		      params : {
		      	apiKey : "4fccb901e4b0d43c618156c0",
		      	q : '{"user_id" : "' + $scope.user.id + '"}'
		      }
		    }).then(function(response) {
		    	$scope.myCars = response.data;
		    });
	    }, {fields: 'email,name,location,age_range,link,locale'});
	});
  });