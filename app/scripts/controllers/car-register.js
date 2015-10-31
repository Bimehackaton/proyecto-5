'use strict';

/**
 * @ngdoc function
 * @name proyecto5App.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the proyecto5App
 */
angular.module('proyecto5App')
  .controller('CarRegisterCtrl', function ($scope, $http) {
  	$scope.master = {};
  	$scope.car = {};
    $scope.register = function (car){
    	console.log('pacoooo', car);
    };

    $scope.reset = function() {
      console.log('reset');
      $scope.car = {};
    };

  	/* Variables */
  	$scope.master = {};
  	$scope.car = {};

    $scope.register = function (car){
    	if (!$scope.carForm.$valid) {
        return;
      }

      $http({
        url: "https://api.mongolab.com/api/1/databases/project/collections/car?apiKey=4fccb901e4b0d43c618156c0",
        method: "POST",
        data : car,
        headers : {
          contentType: "application/json"
        }
      }).then(function(response) {
        console.log(response)
      }).catch(function(error) {
        console.log(error)
      });
    };

    $scope.reset = function() {
        $scope.car = {};
      };
  });
