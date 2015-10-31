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
      zoom: 13
    };

    $scope.onClick = function(marker, eventName, model) {
        console.log("Clicked!");
        model.show = !model.show;
        $scope.selectedCarMarker = model;
    };

    $scope.reservar = function(m) {
      console.log("Clicked!");
      $scope.selectedCarMarker = $scope.carMarkers;
      console.log();
    };

    $http({
      method : 'GET',
      url    : '/scripts/data/cars.json'
    }).then(function successCallback(response) {
      $scope.carMarkers = response.data;

      

      // this callback will be called asynchronously
      // when the response is available
      }, function errorCallback(response) {
      console.error(response);
      // called asynchronously if an error occurs
      // or server returns response with an error status.
    });

  });