'use strict';

/**
 * @ngdoc function
 * @name proyecto5App.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the proyecto5App
 */
angular.module('proyecto5App')
  .controller('CarCtrl', function ($scope, $http) {
    $scope.map = {
      center: {
    latitude: 43.266506,
    longitude: -2.934938
    },
    zoom: 8
  };

  $http({
    method : 'GET',
    url    : '/scripts/data/cars.json'
  }).then(function successCallback(response) {
    console.log(response);
      // this callback will be called asynchronously
      // when the response is available
    }, function errorCallback(response) {
      console.error(response);
      // called asynchronously if an error occurs
      // or server returns response with an error status.
    });
  });