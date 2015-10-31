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
  });
