'use strict';

/**
 * @ngdoc function
 * @name proyecto5App.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the proyecto5App
 */
angular.module('proyecto5App')
  .controller('CarRegisterCtrl', function () {
  	this.master = {};
  	this.car = {};
    this.register = function (car){
    	console.log('pacoooo');
    }

    this.reset = function() {
        this.car = {};
      };
  });
