'use strict';
/* global angular */
// Declare app level module which depends on views, and components
angular.module('alloy', [
  'ngRoute',
  'alloy.home',
  'textAngular'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.html5Mode(true);

  $routeProvider.otherwise({redirectTo: '/home'});
}])
.controller('app',['$scope','$rootScope','DataService', function ($scope,$rootScope,DataService) {

}])

.factory('DataService',['$http',function($http){
  var BASE_URL = 'http://localhost:3005/v1/';
  var config = {"Content-Type":"application/json"};
  return {
    BASE_URL: BASE_URL,
    getList: getList,
    getListByCntx: getListByCntx,
    addDoc: addDoc,
    updateDoc: updateDoc,
    deleteDoc: deleteDoc,
    reorder: reorder,
    sendMail: sendMail,
  }

  function getList(coll){
    return $http.get(BASE_URL+coll,config).then(function(resp){
      var respData = resp.data;
      return respData;
    },function(error){
      console.log(coll+' ERROR:',error);
    });
  }

  function getListByCntx(coll,pid){
    return $http.get(BASE_URL+coll+'/cntx/'+pid,config).then(function(resp){
      var respData = resp.data;
      return respData;
    },function(error){
      console.log(coll+' ERROR:',error);
    });
  }

  function addDoc(coll,data){
    return $http.post(BASE_URL+coll+'/add',data,config).then(function(resp){
      var respData = resp.data;
      return respData;
    },function(error){
      console.log(coll+' ERROR:',error);
    });
  }

  function updateDoc(coll,id,data){
    return $http.put(BASE_URL+coll+'/'+id,{"data": data},config).then(function(resp){
      var respData = resp.data;
      return respData;
    },function(error){
      console.log(coll+' ERROR:',error);
    });
  }

  function deleteDoc(coll,id){
    return $http.delete(BASE_URL+coll+'/'+id,config).then(function(resp){
      var respData = resp.data;
      return respData;
    },function(error){
      console.log(coll+' ERROR:',error);
    });
  }

  function reorder(coll,id,ord){
    return $http.post(BASE_URL+coll+'/'+id+'/reorder',{"data": ord},config).then(function(resp){
      var respData = resp.data;
      return respData;
    },function(error){
      console.log(coll+' ERROR:',error);
    });
  }

  function sendMail(data){
    return $http.post(BASE_URL+'sendmail',{data},config).then(function(resp){
      var respData = resp.data;
      return respData;
    },function(error){
      console.log(coll+' ERROR:',error);
    });
  }
}]);