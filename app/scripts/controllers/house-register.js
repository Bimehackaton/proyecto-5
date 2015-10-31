'use strict';

/**
 * @ngdoc function
 * @name proyecto5App.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the proyecto5App
 */
angular.module('proyecto5App')
    .controller('HouseRegisterCtrl', function ($scope, $http, $uibModal, Facebook) {
    	Facebook.getLoginStatus(function(response) {
         if(response.status !== 'connected') {
          return
         }
        $scope.master = {};
          $scope.house = {};

          Facebook.api('/me', function(response) {
          	console.log(response);
            $scope.house.user_id = response.id;
            $scope.house.user_name = response.name;
          });
      
          $scope.register = function (house){
      	   console.log('pacoooo', house);
          };

          $scope.reset = function() {
            console.log('reset');
            $scope.house = {};
          };

        	/* Variables */
        	$scope.master = {};
        	$scope.house = {};

          $scope.register = function (house){
          	if (!$scope.houseForm.$valid) {
              return;
            }

            $http({
              url: "https://api.mongolab.com/api/1/databases/project/collections/house?apiKey=4fccb901e4b0d43c618156c0",
              method: "POST",
              data : house,
              headers : {
                contentType: "application/json"
              }
            }).then(function() {
              $scope.open();
              $scope.reset();
            }).catch(function(error) {
              console.log(error);
            });
          };

          $scope.onChange = function (direccion){

            $http({
              url: "http://maps.google.com/maps/api/geocode/json?",
              method: "GET",
              params : {'address':direccion, 'sensor':true},
              
            }).then(function(response) {
              var codigopostal = response.data.results[0].address_components[response.data.results[0].address_components.length-1].short_name;
              $scope.house.codigopostal = codigopostal

              $scope.house.geo = response.data.results[0].geometry.location;
            }).catch(function(error) {
              console.log(error);
            });
          };


          $scope.reset = function() {
              $scope.house = {};
          };



          $scope.open = function (size) {

              $uibModal.open({
                  animation: $scope.animationsEnabled,
                  templateUrl: 'myModalContent.html',
                  controller: 'ModalInstanceCtrl',
                  size: size});

              /*modalInstance.result.then(function (selectedItem) {
                      $scope.selected = selectedItem;
                  }, function () {
                      $log.info('Modal dismissed at: ' + new Date());
                  });*/
          };

          $scope.toggleAnimation = function () {
              $scope.animationsEnabled = !$scope.animationsEnabled;
          };
        });

    });
