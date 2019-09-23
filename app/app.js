'use strict';
/* global angular */
// Declare app level module which depends on views, and components
angular.module('whiteflag', [
  'ngRoute',
  'whiteflag.home',
  'whiteflag.studies',
  'whiteflag.updates',
  'whiteflag.devotions',
  'whiteflag.settings',
  'whiteflag.about',
  'whiteflag.bugs',
  'whiteflag.svcs',
  'whiteflag.give',
  'whiteflag.prayer',
  'whiteflag.foodbank',
  'whiteflag.disc',
  'whiteflag.missions',
  'whiteflag.resources',
  'goback',
  'navMenu'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.html5Mode(true);

  $routeProvider.otherwise({redirectTo: '/home'});
}])
.controller('app',['$scope','$rootScope','DataService', function ($scope,$rootScope,DataService) {

}]);