'use strict';

//////////////////////////////////////////////////
// DATA SERVICE
angular.module('alloy').factory('DataService',['$http',function($http){
  var BASE_URL = 'http://localhost:3005/v1/';
  var config = {"Content-Type":"application/json"};
  return {
    BASE_URL: BASE_URL,
    getList: getList,
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

  function addDoc(coll,data){
    return $http.post(BASE_URL+coll+'/add',{"data": data},config).then(function(resp){
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

/////////////////////////////////////////////////
// HOME
angular.module('alloy.home', [])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/home', {
    templateUrl: 'home.html',
    controller: 'HomeCtrl'
  });
}])

.controller('HomeCtrl', ['$scope','DataService', function ($scope,DataService) {
    DataService.getList('notes').then(function(resp){
      console.log(resp);
      $scope.notes = resp;
    });
}]);

// Email
//////////////////////////////////////////////////////////
angular.module('alloy.form',[])

.config(['$routeProvider',function($routeProvider) {
  $routeProvider.when('/form', { templateUrl: 'form.html', controller: 'FormCtrl' });
}])

.controller('FormCtrl', ['$scope','$http','DataService', function($scope, $http, DataService) {
  $scope.blanks = [undefined,null,''];
  $scope.emailError = false;
  $scope.emailData = {
    subject: '',
    to: '',
    from: '',
    html: ''
  };

  $scope.prepEmailRequest = function(){
    $scope.emailError = false;
    $scope.emailHtml = '';
    $scope.emailHtml += "<div>Form details:</div><br /><br />";
    if($scope.blanks.indexOf($scope.emailName)==-1){
      $scope.emailHtml += '<div><b>Name:</b>&nbsp;&nbsp;' + $scope.emailName + '</div>';
    }
    if($scope.blanks.indexOf($scope.emailEmail)==-1){
      $scope.emailHtml += '<div><b>Email:</b>&nbsp;&nbsp;' + $scope.emailEmail; + '</div>';
    }
    if($scope.blanks.indexOf($scope.emailPhone)==-1){
      var phone = $scope.emailPhone;
      $scope.emailHtml += '<div><b>Phone:</b>&nbsp;' + $scope.emailPhone; + '</div>';
    }
    if($scope.blanks.indexOf($scope.emailRequest)==-1){
      $scope.emailHtml += '<div><b>Content:</b><br />' + $scope.emailRequest; + '</div>';
      $scope.sendEmailRequest();
    }else{
      $scope.emailError = true;
    }
  }

  $scope.sendEmailRequest = function(){
    $scope.emailData.html = $scope.emailHtml;
    var emailData = $scope.emailData;
    DataService.sendMail(emailData)
    .then(function(resp){
      console.log(resp);
      if(resp=='OK'){
        $scope.emailSentMsg = 'Your email was sent.';
      }else{
        $scope.emailSentMsg = 'Sorry, something went wrong and your email was not sent.';
      }
      $scope.showResult = true;
    });

  }

  $scope.resetEmailForm = function(){
    $scope.emailHtml = '';
    $scope.emailName = null;
    $scope.emailEmail = null;
    $scope.emailPhone = null;
    $scope.emailRequest = null;
    $scope.showResult = false;
    window.scrollTo(0,1);
  }
}]);

// filters
// .filter('timeago', function() {
//   return function(input, p_allowFuture) {

//       var substitute = function (stringOrFunction, number, strings) {
//               var string = angular.isFunction(stringOrFunction) ? stringOrFunction(number, dateDifference) : stringOrFunction;
//               var value = (strings.numbers && strings.numbers[number]) || number;
//               return string.replace(/%d/i, value);
//           },
//           nowTime = (new Date()).getTime(),
//           date = (new Date(input)).getTime(),
//           //refreshMillis= 6e4, //A minute
//           allowFuture = p_allowFuture || false,
//           strings= {
//               prefixAgo: '',
//               prefixFromNow: '',
//               suffixAgo: "ago",
//               suffixFromNow: "from now",
//               seconds: "less than a minute",
//               minute: "about a minute",
//               minutes: "%d minutes",
//               hour: "about an hour",
//               hours: "about %d hours",
//               day: "a day",
//               days: "%d days",
//               month: "about a month",
//               months: "%d months",
//               year: "about a year",
//               years: "%d years"
//           },
//           dateDifference = nowTime - date,
//           words,
//           seconds = Math.abs(dateDifference) / 1000,
//           minutes = seconds / 60,
//           hours = minutes / 60,
//           days = hours / 24,
//           years = days / 365,
//           separator = strings.wordSeparator === undefined ?  " " : strings.wordSeparator,
      
          
//           prefix = strings.prefixAgo,
//           suffix = strings.suffixAgo;
          
//       if (allowFuture) {
//           if (dateDifference < 0) {
//               prefix = strings.prefixFromNow;
//               suffix = strings.suffixFromNow;
//           }
//       }

//       words = seconds < 45 && substitute(strings.seconds, Math.round(seconds), strings) ||
//       seconds < 90 && substitute(strings.minute, 1, strings) ||
//       minutes < 45 && substitute(strings.minutes, Math.round(minutes), strings) ||
//       minutes < 90 && substitute(strings.hour, 1, strings) ||
//       hours < 24 && substitute(strings.hours, Math.round(hours), strings) ||
//       hours < 42 && substitute(strings.day, 1, strings) ||
//       days < 30 && substitute(strings.days, Math.round(days), strings) ||
//       days < 45 && substitute(strings.month, 1, strings) ||
//       days < 365 && substitute(strings.months, Math.round(days / 30), strings) ||
//       years < 1.5 && substitute(strings.year, 1, strings) ||
//       substitute(strings.years, Math.round(years), strings);
//   //console.log(prefix+words+suffix+separator);
//   prefix.replace(/ /g, '')
//   words.replace(/ /g, '')
//   suffix.replace(/ /g, '')
//   return (prefix+' '+words+' '+suffix+' '+separator);
      
//   };
// });