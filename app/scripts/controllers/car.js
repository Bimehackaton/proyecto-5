'use strict';

/**
 * @ngdoc function
 * @name proyecto5App.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the proyecto5App
 */
angular.module('proyecto5App')
  .controller('CarCtrl', function ($scope, $http, $filter) {
    $scope.map = {
      center: {
      latitude: 43.266506,
      longitude: -2.934938
      },
      zoom: 13
    };

    $scope.$watch("selectedFestival", function(selectedFestival){
      if (!selectedFestival) {
        $scope.filteredMarkers = $scope.carMarkers;
        return;
      }

      $scope.filteredMarkers = $filter("filter")($scope.carMarkers, {festival : selectedFestival});
   });

    $scope.onClick = function(marker, eventName, model) {
        model.show = !model.show;
        $scope.selectedCarMarker = model;
        console.log(model);
    };

    $scope.onChangeFestival = function(marker, eventName, model) {
      $scope.selectedCarMarker = null;
      model = null;
    };

    $scope.reservar = function(carMarker) {
      $scope.selectedCarMarker = carMarker;
      $http({
        url: "https://api.mongolab.com/api/1/databases/project/collections/reservedCar?apiKey=4fccb901e4b0d43c618156c0",
        method: "POST"
        data: {car_id: carMarker.id, user: $scope.user.id}
      }).then(function(response) {
        angular.forEach(response.data, function(car) {
          car.id = car._id.$oid;
          car.geo = {
            type : "Point",
            coordinates: [car.geo.lng, car.geo.lat]
          };
          car.icon = "images/car.png";
        });
    };

    $http({
      url: "scripts/data/festivals.json",
      method: "GET"
    }).then(function(response) {
      $scope.festivals = response.data;
    }).catch(function(error) {
      console.error(error);
    });

    $http({
      url: "https://api.mongolab.com/api/1/databases/project/collections/car?apiKey=4fccb901e4b0d43c618156c0",
      method: "GET"
    }).then(function(response) {
      angular.forEach(response.data, function(car) {
        car.id = car._id.$oid;
        car.geo = {
          type : "Point",
          coordinates: [car.geo.lng, car.geo.lat]
        };
        car.icon = "images/car.png";
      });
      $scope.carMarkers = response.data;
      $scope.filteredMarkers = $scope.carMarkers;

      // this callback will be called asynchronously
      // when the response is available
      }, function errorCallback(response) {
        console.error(response);
        // called asynchronously if an error occurs
        // or server returns response with an error status.
    });

     $http({
      url: "scripts/data/houses.json",
      method: "GET"
    }).then(function(response) {
      console.log(response);
      $scope.houseMarkers = response.data;
    });
  });