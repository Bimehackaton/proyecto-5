'use strict';

/**
 * @ngdoc overview
 * @name proyecto5App
 * @description
 * # proyecto5App
 *
 * Main module of the application.
 */
angular
  .module('proyecto5App', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'uiGmapgoogle-maps',
    'facebook'
  ])

  .config(function(uiGmapGoogleMapApiProvider, FacebookProvider) {
    uiGmapGoogleMapApiProvider.configure({
        //    key: 'your api key',
        v: '3.20', //defaults to latest 3.X anyhow
        libraries: 'weather,geometry,visualization'
    });
    FacebookProvider.init('817693171681304');
  })

  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/car', {
        templateUrl: 'views/car.html',
        controller: 'CarCtrl',
        controllerAs: 'car'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
