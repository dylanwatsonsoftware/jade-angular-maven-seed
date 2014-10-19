/*global angular:false */'use strict';


angular.module('myApp', [
  //'ngResource',
  'ngSanitize',
  'ui.router',
  'ui.bootstrap'
])
.config(function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
    $urlRouterProvider
      .otherwise('/');
  });