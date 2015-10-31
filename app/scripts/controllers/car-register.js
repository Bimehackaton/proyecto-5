'use strict';

/**
 * @ngdoc function
 * @name proyecto5App.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the proyecto5App
 */
angular.module('proyecto5App')
  .controller('CarRegisterCtrl', function ($scope) {
<<<<<<< HEAD
  	$scope.master = {};
  	$scope.car = {};
    $scope.register = function (car){
    	console.log('pacoooo', car);
    };

    $scope.reset = function() {
      console.log('reset');
      $scope.car = {};
    };
=======
  	/* Variables */
  	$scope.master = {};
  	$scope.car = {};

    $scope.register = function (car){
    	console.log('pacoooo');
    	console.log(car);
    };

    $scope.reset = function() {
        $scope.car = {};
      };
>>>>>>> cc29f066dbb53b1957e38b877df0ce68fd0aa653
  });
