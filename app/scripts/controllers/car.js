'use strict';

/**
 * @ngdoc function
 * @name proyecto5App.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the proyecto5App
 */
angular.module('proyecto5App')
  .controller('CarCtrl', function ($scope, $http, $filter, Facebook) {
    
    $scope.carMarkers = [];
    $scope.filteredMarkers = [];
    $scope.houseMarkers = [];

    Facebook.getLoginStatus(function(response) {
      if(response.status === 'connected') {
        Facebook.api('/me', function(response) {
          $scope.user = response;
        });
      }
    });
    
    
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

    //$scope.mapFilter = "houses";
    $scope.filterMap = function(mapFilter) {
      console.log(mapFilter);
      if (mapFilter == "houses") {
        angular.forEach($scope.houseMarkers, function(houseMarker) {
          houseMarker.options.visible = true;
        });
        angular.forEach($scope.carMarkers, function(carMarker) {
          carMarker.options.visible = false;
        });
      } else if (mapFilter == "cars") {
        angular.forEach($scope.houseMarkers, function(houseMarker) {
          houseMarker.options.visible = false;
        });
        angular.forEach($scope.carMarkers, function(carMarker) {
          carMarker.options.visible = true;
        });
      }
    }

    $scope.onClick = function(marker, eventName, model) {
        model.show = !model.show;
        $scope.selectedHouseMarker = false;
        $scope.selectedCarMarker = model;
        console.log(model);
    };

    $scope.onChangeFestival = function(marker, eventName, model) {
      $scope.selectedCarMarker = false;
      model = null;
    };

    $scope.reservar = function(carMarker) {
      $scope.selectedHouseMarker = false;
      $scope.selectedCarMarker = carMarker;
      $http({
        url: "https://api.mongolab.com/api/1/databases/project/collections/reservedCar?apiKey=4fccb901e4b0d43c618156c0",
        method: "POST",
        data: {
          car_id: carMarker.id,
          user_id: $scope.user.id
        }
      }).then(function(response) {
        console.log('reserva ok');
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
        car.options = {};
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
      url: "https://api.mongolab.com/api/1/databases/project/collections/house?apiKey=4fccb901e4b0d43c618156c0",
      method: "GET"
    }).then(function(response) {
      console.log(response);
      angular.forEach(response.data, function(house) {
        house.id = house._id.$oid;
        house.geo = {
          type : "Point",
          coordinates: [house.geo.lng, house.geo.lat]
        };
        house.icon = "images/apartment-3.png";
        house.options = {};
      });
      $scope.houseMarkers = response.data;
    });

    $scope.onHouseClick = function(marker, eventName, model) {
        model.show = !model.show;
        $scope.selectedCarMarker = false;
        $scope.selectedHouseMarker = model;
        console.log(model);
    };

    $scope.reservarHouse = function(houseMarker) {
      $scope.selectedHouseMarker = houseMarker;
      $scope.selectedCarMarker = null;
      $http({
        url: "https://api.mongolab.com/api/1/databases/project/collections/reservedHouse?apiKey=4fccb901e4b0d43c618156c0",
        method: "POST",
        data: {
          car_id: houseMarker.id,
          user_id: $scope.user.id
        }
      }).then(function(response) {
        console.log('reserva ok');
      });
    };
  });