'use strict';
/* global angular */
// Declare app level module which depends on views, and components
angular.module('alloy', [
  'ngRoute',
  'alloy.home',
  'ngSanitize'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.html5Mode(true);

  $routeProvider.otherwise({redirectTo: '/home'});
}])
.controller('app',['$scope','$rootScope','DataService', function ($scope,$rootScope,DataService) {

}]);