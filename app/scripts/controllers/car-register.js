'use strict';

/**
 * @ngdoc function
 * @name proyecto5App.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the proyecto5App
 */
angular.module('proyecto5App')
    .controller('CarRegisterCtrl', function ($scope, $http, $uibModal) {

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

            if(!isNaN(codigopostal)){
              $scope.car.codigopostal = codigopostal;  
            } else {
              $scope.car.codigopostal = 'Escriba la direccion completa';  
            }

            $scope.car.geo = response.data.results[0].geometry.location;
          }).catch(function(error) {
            console.log(error)
          });
        };


        $scope.reset = function() {
            $scope.car = {};
        };



        $scope.open = function (size) {

            var modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,
                templateUrl: 'myModalContent.html',
                controller: 'ModalInstanceCtrl',
                size: size,
                resolve: {
                    items: function () {
                    return $scope.items;
                        }
                    }
                });

            modalInstance.result.then(function (selectedItem) {
                    $scope.selected = selectedItem;
                }, function () {
                    $log.info('Modal dismissed at: ' + new Date());
                });
        };

        $scope.toggleAnimation = function () {
            $scope.animationsEnabled = !$scope.animationsEnabled;
        };

        /*$scope.selected = {
            item: $scope.items[0]
        };*/

        $scope.ok = function () {
            $uibModalInstance.close($scope.selected.item);
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

        $scope.open();
}).controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, items) {

  /*$scope.items = items;
  $scope.selected = {
    item: $scope.items[0]
  };

  $scope.ok = function () {
    $uibModalInstance.close($scope.selected.item);
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };*/
});