'use strict';

// GLOBAL COMPONENTS
angular.module('goback', []).directive('goback', function() {
  return {
    template: 
      '<ul class="list-group">'+
          '<li class="list-group-item no-border">'+
              '<a href="/home">'+
                  '<span class="fas fa-fw fa-chevron-left text-left"></span>'+
                  '<span>Back</span>'+
              '</a>'+
          '</li>'+
      '</ul>'
  };
});

angular.module('navMenu', []).directive('navMenu', function() {
  return {
    template: 
      '<ul id="wfc-menu" class="nav col-12-sm nopad">'+
        '<li class="nav-item col-2-sm">'+
          '<a class="nav-link text-white" href="/home">Home</a>'+
        '</li>'+
        '<li class="nav-item col-2-sm">'+
          '<a class="nav-link text-white" href="/studies">Studies</a>'+
        '</li>'+
        '<li class="nav-item col-2-sm">'+
          '<a class="nav-link text-white" href="/devotions">Devotions</a>'+
        '</li>'+
        '<li class="nav-item col-2-sm">'+
          '<a class="nav-link text-white" href="/prayer">Prayer</a>'+
        '</li>'+
        
      '</ul>'
  };
});

/* 
'<li class="hamburger" class="nav-item">' +
  '<a class="text-white menu-drop" href=""><i class="fas fa-fw fa-bars"></i></a>' +
'</li>' +
*/

//////////////////////////////////////////////////
// DATA SERVICE
angular.module('whiteflag').factory('DataService',['$http',function($http){
  var BASE_URL = 'https://whiteflagmobile.com/api/';
  var config = {"Content-Type":"application/json"};
  return {
    BASE_URL: BASE_URL,
    getList: getList,
    addDoc: addDoc,
    updateDoc: updateDoc,
    deleteDoc: deleteDoc,
    reorder: reorder,
    sendpn: sendpn,
    sendMail: sendMail
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

  function sendpn(msgOptions){
    return $http.post(BASE_URL+'push/sendpn',{"data": msgOptions},config).then(function(resp){
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
// LANG
angular.module('whiteflag.lang', [])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/lang', {
    templateUrl: 'lang.html',
    controller: 'LangCtrl'
  });
}])

.controller('LangCtrl', ['$scope', function ($scope) {


}]);


// HOME
angular.module('whiteflag.home', [])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/home', {
    templateUrl: 'home.html',
    controller: 'HomeCtrl'
  });
}])

.controller('HomeCtrl', ['$scope', function ($scope) {
    $scope.topBanner = null;
    $scope.menuItems = [
      { icon: 'fas fa-fw fa-book-open', name: 'Today\'s Devotion', url: '/devotions' },
      { icon: 'fas fa-fw fa-bullhorn', name: 'Announcements', url: '/news'},
      { icon: 'far fa-fw fa-clock', name: 'Services & Contact Info', url: '/services'},
      { icon: 'fas fa-fw fa-podcast', name: 'Sermon Podcast', url: '/studies'},
      { icon: 'far fa-fw fa-map', name: 'Map', url:'https://www.google.com/maps/place/4625+E+Iowa+Ave,+Denver,+CO+80222/@39.6836303,-104.9332396,15z/data=!4m7!1m4!3m3!1s0x876c7dde82eac263:0x2912172574625955!2s4625+E+Iowa+Ave,+Denver,+CO+80222!3b1!3m1!1s0x876c7dde82eac263:0x2912172574625955',ext: true},
      { icon: 'far fa-fw fa-play-circle', name: 'Studies', url:'/studies'},
      { icon: 'far fa-fw fa-paper-plane', name: 'Prayer Requests', url: '/prayer' },
      { icon: 'fas fa-fw fa-globe', name: 'Missions', url: '/missions' },
      { icon: 'fas fa-fw fa-receipt', name: 'Giving', url:'/giving'},
      { icon: 'fas fa-fw fa-heart', name: 'Love Abounds Food Bank', url:'/foodbank'},
      { icon: 'fas fa-fw fa-book', name: 'Discipleship', url:'/discipleship'},
      { icon: 'fas fa-fw fa-chalkboard-teacher', name: 'Resources', url: '/resources' },
      { icon: 'fab fa-fw fa-youtube', name: 'YouTube Videos', url:'https://m.youtube.com/channel/UCNum-_XTF3mmxVUzVRHki8Q',ext: true},
      { icon: 'fab fa-fw fa-facebook', name: 'Facebook Page', url:'https://m.facebook.com/whiteflagcalvary',ext: true},
      { icon: 'fas fa-fw fa-info', name: 'About The App', url:'/about'},
      { icon: 'fas fa-fw fa-bug', name: 'Bug Reports', url:'/bugs'}
    ];

}]);

// NEWS/ANNOUNCEMENTS
//////////////////////////////////////////////////////////
angular.module('whiteflag.news', [])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/news', { templateUrl: 'news.html', controller: 'NewsCtrl' });
}])

.controller('NewsCtrl', ['$scope','$http','DataService',function ($scope,$http,DataService) {
    $scope.topBanner = 'announce.jpg';
    //console.log('news controller');
    DataService.getList('anns').then(function(resp){
      $scope.anns = resp.filter(function(ann){
        if(ann.publish===true){
          return ann;
        }
      });
    });
}]);

// STUDIES
//////////////////////////////////////////////////////////
angular.module('whiteflag.studies', [])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/studies', { templateUrl: 'studies.html', controller: 'StudiesCtrl' });
}])

.filter('trustAsResourceUrl', ['$sce', function ($sce) {
    return function (val) {
        return $sce.trustAsResourceUrl(val);
    };
}])

.controller('StudiesCtrl', ['$scope', function ($scope) {
  $scope.currentStudy = null;
  $scope.currentPlayer = null;
  $scope.topBanner = 'studies.jpg';
  $scope.menuItems = [
    {name: 'Grace Discipleship',player_url: '34369'},
    {name:'Exodus',player_url: '31551'},
    {name:'Elisha',player_url: '31553'},
    {name:'Philippians',player_url: '31554'},
    {name:'Revelation',player_url: '31557'},
    {name:'Genesis',player_url: '31556'},
    {name:'Ephesians',player_url: '31555'},
    {name:'Zechariah',player_url: '31558'},
    {name:'Galatians',player_url: '31559'},
    {name:'Topical',player_url: '31560'}
    ];
    
    $scope.setStudy = function(study){
      console.log('study set to',study);
      if(study != null){
        $scope.currentStudy = study;
        $scope.currentStudyObj = $scope.menuItems.filter(function(el) {
          if(el.name == study){
            return el;
          }
        });
        $scope.currentPlayer = $scope.currentStudyObj[0].player_url; 
        console.log('player',$scope.currentPlayer);
      }else{
        $scope.currentStudy = null;
        $scope.currentPlayer = null;
      }
    }
    
    $scope.setPlayerUrl = function(id){
      return 'https://whiteflagcalvary.sermon.net/widget/listplayer/'+id;
    }

    $scope.copyToClipboard = str => {
      const el = document.createElement('textarea');  // Create a <textarea> element
      el.value = str;                                 // Set its value to the string that you want copied
      el.setAttribute('readonly', '');                // Make it readonly to be tamper-proof
      el.style.position = 'absolute';                 
      el.style.left = '-9999px';                      // Move outside the screen to make it invisible
      document.body.appendChild(el);                  // Append the <textarea> element to the HTML document
      const selected =            
        document.getSelection().rangeCount > 0        // Check if there is any content selected previously
          ? document.getSelection().getRangeAt(0)     // Store selection if found
          : false;                                    // Mark as false to know no selection existed before
      el.select();                                    // Select the <textarea> content
      document.execCommand('copy');                   // Copy - only works as a result of a user action (e.g. click events)
      document.body.removeChild(el);                  // Remove the <textarea> element
      if (selected) {                                 // If a selection existed before copying
        document.getSelection().removeAllRanges();    // Unselect everything on the HTML document
        document.getSelection().addRange(selected);   // Restore the original selection
      }
    };
}]);

// DEVOTIONS
//////////////////////////////////////////////////////////
angular.module('whiteflag.devotions', [])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/devotions', { templateUrl: 'devotions.html', controller: 'DevotionsCtrl' });
}])

.controller('DevotionsCtrl', ['$scope',function($scope) {
  
    // if(window.location.hash.indexOf('devotions')!=-1) {
    //   var url = 'http://livinginchrist.org/wp-content/media/dbdbg/dbdbg.php';
    //   $('#devos').attr('src',url);
    // }  
}]);

// PRAYER
//////////////////////////////////////////////////////////
angular.module('whiteflag.prayer',[])

.config(['$routeProvider',function($routeProvider) {
  $routeProvider.when('/prayer', { templateUrl: 'prayer.html', controller: 'PrayerCtrl' });
}])

.controller('PrayerCtrl', ['$scope','$http','DataService', function($scope, $http, DataService) {
  $scope.topBanner = 'pray.jpg';
  $scope.blanks = [undefined,null,''];
  $scope.prayerError = false;
  $scope.prayerData = {
    subject: 'White Flag Mobile: Prayer Request',
    to: 'shawn@whiteflagcalvary.org',
    from: 'donotreply@whiteflagcalvary.org',
    html: ''
  };

  $scope.prepPrayerRequest = function(){
    $scope.prayerError = false;
    $scope.prayerHtml = '';
    $scope.prayerHtml += "<div>You've been sent a prayer request from the White Flag Mobile App. Here are the details:</div><br /><br />";
    if($scope.blanks.indexOf($scope.prayerName)==-1){
      $scope.prayerHtml += '<div><b>Name:</b>&nbsp;&nbsp;' + $scope.prayerName + '</div>';
    }
    if($scope.blanks.indexOf($scope.prayerEmail)==-1){
      $scope.prayerHtml += '<div><b>Email:</b>&nbsp;&nbsp;' + $scope.prayerEmail; + '</div>';
    }
    if($scope.blanks.indexOf($scope.prayerPhone)==-1){
      var phone = $scope.prayerPhone;
      $scope.prayerHtml += '<div><b>Phone:</b>&nbsp;' + $scope.prayerPhone; + '</div>';
    }
    if($scope.blanks.indexOf($scope.prayerRequest)==-1){
      $scope.prayerHtml += '<div><b>Prayer Request:</b><br />' + $scope.prayerRequest; + '</div>';
      $scope.sendPrayerRequest();
    }else{
      $scope.prayerError = true;
    }
  }

  $scope.sendPrayerRequest = function(){
    $scope.prayerData.html = $scope.prayerHtml;
    var prayerData = $scope.prayerData;
    DataService.sendMail(prayerData)
    .then(function(resp){
      console.log(resp);
      if(resp=='OK'){
        $scope.prayerSentMsg = 'Your prayer request was sent. Pastor Shawn will be praying for you.';
      }else{
        $scope.prayerSentMsg = 'Sorry, something went wrong and your prayer request was not sent.';
      }
      $scope.showResult = true;
    });

  }

  $scope.resetPrayerForm = function(){
    $scope.prayerHtml = '';
    $scope.prayerName = null;
    $scope.prayerEmail = null;
    $scope.prayerPhone = null;
    $scope.prayerRequest = null;
    $scope.showResult = false;
    window.scrollTo(0,1);
  }
}]);


// ABOUT
//////////////////////////////////////////////////////////
angular.module('whiteflag.about', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/about', { templateUrl: 'about.html', controller: 'AboutCtrl' });
}])

.controller('AboutCtrl', [function() {

}]);

// BUGS
//////////////////////////////////////////////////////////
angular.module('whiteflag.bugs', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/bugs', { templateUrl: 'bugs.html', controller: 'BugsCtrl' });
}])

.controller('BugsCtrl', [function() {

}]);

// SERVICES
//////////////////////////////////////////////////////////
angular.module('whiteflag.svcs', [])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/services', { templateUrl: 'services.html', controller: 'ServicesCtrl' });
}])

.controller('ServicesCtrl', ['$scope',function($scope) {
    $scope.topBanner = 'lights.jpg';
}]);


// MISSIONS
//////////////////////////////////////////////////////////
angular.module('whiteflag.missions', [])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/missions', { templateUrl: 'missions.html', controller: 'MissionsCtrl' });
}])

.filter('trustAsResourceUrl', ['$sce', function ($sce) {
    return function (val) {
        return $sce.trustAsResourceUrl(val);
    };
}])

.controller('MissionsCtrl', ['$scope',function($scope) {
  $scope.topBanner = 'world.jpg';
}]);


// GIVING
//////////////////////////////////////////////////////////
angular.module('whiteflag.give',[])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/giving', { templateUrl: 'giving.html', controller: 'GivingCtrl' });
}])

.controller('GivingCtrl', ['$scope',function($scope) {
  $scope.topBanner = 'giving.jpg';
}]);

// FOODBANK
//////////////////////////////////////////////////////////
angular.module('whiteflag.foodbank', [])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/foodbank', { templateUrl: 'foodbank.html', controller: 'FoodbankCtrl' });
}])

.controller('FoodbankCtrl', ['$scope',function($scope) {
  $scope.topBanner = 'foodbox.jpg';
}]);

//DISCIPLESHIP
//////////////////////////////////////////////////////////
angular.module('whiteflag.disc',[])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/discipleship', { templateUrl: 'discipleship.html', controller: 'DiscipleshipCtrl' });
}])

.filter('trustAsResourceUrl', ['$sce', function ($sce) {
    return function (val) {
        return $sce.trustAsResourceUrl(val);
    };
}])

.controller('DiscipleshipCtrl', ['$scope',function($scope) {
  $scope.topBanner = 'disciple.jpg';
  $scope.currentAudio = null;
  
  $scope.setCurrentAudio = function(url){
    $scope.currentAudio = url;
  }
  
  $scope.getCurrentAudio = function(audioUrl){
    return audioUrl;
  }
}]);

// RESOURCES
//////////////////////////////////////////////////////////
angular.module('whiteflag.resources', [])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/resources', { templateUrl: 'resources.html', controller: 'ResourcesCtrl' });
}])

.filter('trustAsResourceUrl', ['$sce', function ($sce) {
    return function (val) {
        return $sce.trustAsResourceUrl(val);
    };
}])

  .controller('ResourcesCtrl', ['$scope',function($scope) {
    $scope.topBanner = 'resources.jpg';

    $scope.resLib = [
      { name: "Managing Your Emotions" },
      { name: "What Wrong with a Little Porn When You're Single" },
      { name: "Can You Change If You're Gay" },
      { name: "I Just Want To Die" },
      { name: "Feeling Guilty" },
      { name: "Recovering from Child Abuse" },
      { name: "Social Anxiety" },
      { name: "PMS" },
      { name: "Stressed to the Max" },
      { name: "Eating Disorders" },
      { name: "Freedom From Addiction" },
      { name: "Freedom From Guilt" },
      { name: "Grief" },
      { name: "Becoming a Widow" },
      { name: "Fibromyalgia" },
      { name: "Suffering" },
      { name: "PTSD" },
      { name: "Temptation" },
      { name: "When Crisis Hits" },
      { name: "Burned Out?" },
      { name: "Accepting God's Forgiveness" },
      { name: "Raising Sexually Healthy Kids" },
      { name: "How to Talk to Your Kid about Sex" },
      { name: "Homosexuality and the Bible" },
      { name: "Your Gay Child Says 'I Do'" },
      { name: "Your Child Says, 'I'm Gay'" },
      { name: "Grieving a Suicide" },
      { name: "Diagnosed with Breast Cancer" },
      { name: "Relief without Cutting" },
      { name: "The Empty Nest" },
      { name: "Facing Death with Hope" },
      { name: "The Gay Dilemma and Your Church" },
      { name: "When Trouble Shows Up" },
      { name: "Alzheimer's Disease" },
      { name: "Anxiety and Panic Attacks" },
      { name: "When Bad Things Happen" },
      { name: "When Cancer Interrupts" },
      { name: "What's Wrong with a Little Porn When You're Married" },
      { name: "Menopause" },
      { name: "Life after Retirement" },
      { name: "Divorce Recovery" },
      { name: "Living Together" },
      { name: "How to Say No When Your Body Says Yes" },
      { name: "Sexual Assault" },
      { name: "Conflict" },
      { name: "Controlling Anger" },
      { name: "Renewing Marital Intimacy" },
      { name: "Helping Your Adopted Child" },
      { name: "Recoving from Child Abuse" },
      { name: "Your Special Needs Child" },
      { name: "Parenting Your ADHD Child" },
      { name: "A Father's Guide to Raising Girls" },
      { name: "Who Does the Dishes?" },
      { name: "Forgiving Others" },
      { name: "iSnooping on Your Kid" },
      { name: "Greiving the Loss of Your Child" },
      { name: "Forming a Strong Mother-Daughter Bond" },
      { name: "Sex Before Marriage" },
      { name: "How Do I Stop Losing It with My Kids?" },
      { name: "Infertility" },
      { name: "Bringing Christ to Abused Women" },
      { name: "Hope for the Depressed" },
      { name: "Life Beyond Your Parents' Mistakes" },
      { name: "Overcoming Anxiety" },
      { name: "How Do I Look?" },
      { name: "The Gift of Addiction" },
      { name: "Borderline Personality" },
      { name: "Leaving Your Family Behind" },
      { name: "Your Husband is Addicted to Porn" },
      { name: "Starting Over" },
      { name: "Self-Centered Spouse" },
      { name: "Burnout" },
      { name: "Healing After Abortion" },
      { name: "Living with an Angry Spouse" },
      { name: "Help! My Spouse Committed Adultery" },
      { name: "Abuse" },
      { name: "Sexual Abuse" },
      { name: "Authority Issues" },
      { name: "Post-Traumatic Stress Disorder" },
      { name: "Cutting" },
      { name: "Protecting Children from Abuse in the Church" },
      { name: "Vulnerability" },
      { name: "Romantic Conflict" },
      { name: "Reuniting after Military Deployment" },
      { name: "Children and Divorce" }

    ];

    $scope.audio = [
      { name: 'Answers to Prayer - George Müller', icon: 'fas fa-volume-up', url: 'https://librivox.org/answers-to-prayer-from-george-mullers-narratives-by-george-muller/' },
    ];

    $scope.books = [

    ];

    $scope.videos = [

    ];
}]);

// SETTINGS
//////////////////////////////////////////////////////////
angular.module('whiteflag.settings', [])

.controller('SettingsCtrl', ['$scope','DataService',function ($scope,DataService) {
  $scope.sendPN = function(){
    var msgOptions = {
      title: 'This is a call',
      content: 'Hey oh, here comes a danger up in this club',
      url: '/announcements'
    }
    DataService.sendpn(msgOptions).then(function(resp){
      console.log(resp);
    });
  }
}]);

//SETTINGS ADMIN
//////////////////////////////////////////////////////////
angular.module('whiteflag.settAdm', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/admin', {
    templateUrl: 'settadm.html',
    controller: 'SettAdmCtrl'
  });
}])

.controller('SettAdmCtrl', ['$scope','DataService',function ($scope,DataService) {
  $scope.newAnn = [];
  $scope.addAnnExpanded = false;
  $scope.displayAnn = true;
  $scope.newAnn.pushNotify = false;
  $scope.newAnn.publishAnn = false;
  $scope.addNewAnn = function(){
    // Add a second document with a generated ID.
    if($scope.newAnn.title){
      var title = $scope.newAnn.title;
    }
    if($scope.newAnn.desc){
      var desc = $scope.newAnn.desc;
    }
    if($scope.newAnn.author){
      var author = $scope.newAnn.author;
    }
    if($scope.newAnn.publishAnn){
      var publish = $scope.newAnn.publishAnn;
    }
    if($scope.newAnn.pushNotify){
      var pn = $scope.newAnn.pushNotify;
    }
    var ord = 0;
    var ts = new Date();
    var newAnn = {"title":title,"desc": desc,"author":author,"publish": publish, "pushNotify": pn,"ts":ts,"ord":ord};
    DataService.addDoc('anns',newAnn).then(function(resp){
      console.log(resp);
      
      // Reload Page
      getAdminAnns();
      getPushNotifications();

      // Send Push msg
      var msgOptions = {
        title: title,
        content: desc,
        url: '/announcements'
      }
      $scope.addAnnExpanded = false;
      sendPushNotify(msgOptions);
    },function(err){
      console.log(err);
    });
  }

  $scope.delAnn = function(id){
    DataService.deleteDoc('anns',id).then(function(resp){
      getAdminAnns();
      getPushNotifications();
    },function(err){
      console.log(err);
    });
  };

  $scope.editAnn = function(id){
    //console.log($scope.adminAnns);
    var newAnn = $scope.adminAnns.filter(function(item){
      if(item.id == id){
        return item;
      }
    });
    $scope.newAnn = newAnn[0];
    $scope.editId = newAnn[0].id;
    //console.log($scope.newAnn,$scope.editId);
  };

  $scope.updateNewAnn = function(){
    // Add a second document with a generated ID.
    if($scope.newAnn.title){
      var title = $scope.newAnn.title;
    }
    if($scope.newAnn.desc){
      var desc = $scope.newAnn.desc;
    }
    if($scope.newAnn.author){
      var author = $scope.newAnn.author;
    }
    if($scope.newAnn.publishAnn){
      var publish = $scope.newAnn.publishAnn;
    }
    if($scope.newAnn.pushNotify){
      var pn = $scope.newAnn.pushNotify;
    }
    var ts = new Date();
    var editAnn = {"title":title,"desc": desc,"author":author,"publish": publish, "pushNotify": pn, "ts":ts};
    DataService.updateDoc('anns',$scope.editId,editAnn).then(function(resp){
      console.log(resp);
      $scope.newAnn = null;
      $scope.editId = null;
      getAdminAnns();
      getPushNotifications();
      $scope.addAnnExpanded = false;
    },function(err){
      console.log(err);
    });
  }

  $scope.moveUp = function(id,ord){
    var ts = new Date();
    ord = parseInt(ord,10) - 1;
    var ordData = {"ord":ord,"ts":ts};
    DataService.reorder('anns',id,ordData).then(function(resp){
      console.log(resp);
      getAdminAnns();
      getPushNotifications();
    });
  }

  $scope.moveDown = function(id,ord){
    var ts = new Date();
    ord = parseInt(ord) + 1;
    var ordData = {"ord":ord,"ts":ts};
    DataService.reorder('anns',id,ordData).then(function(resp){
      console.log(resp);
      getAdminAnns();
      getPushNotifications();
    });
  }

  function getAdminAnns(){
    DataService.getList('anns').then(function(resp){
      $scope.adminAnns = resp.filter(function(ann){
        if(ann.publish===true){
          return ann;
        }
      });
    });
  };

  function getPushNotifications(){
    DataService.getList('anns').then(function(resp){
      $scope.adminPN = resp.filter(function(ann){
        if(ann.pushNotify===true){
          return ann;
        }
        console.log($scope.adminPN);
      });
    });
  };

  function sendPushNotify(msgOptions){
    DataService.sendpn(msgOptions).then(function(resp){
      console.log(resp);
    }).catch(function(err){
      console.log(err);
    });
  }

  $scope.toggle = function(togglbool){
    if(togglbool==true){
      togglbool = false;
    }else{
      togglbool = true;
    }
    return togglbool;
  }

  getAdminAnns();
  getPushNotifications();

}])
.filter('timeago', function() {
        return function(input, p_allowFuture) {
    
            var substitute = function (stringOrFunction, number, strings) {
                    var string = angular.isFunction(stringOrFunction) ? stringOrFunction(number, dateDifference) : stringOrFunction;
                    var value = (strings.numbers && strings.numbers[number]) || number;
                    return string.replace(/%d/i, value);
                },
                nowTime = (new Date()).getTime(),
                date = (new Date(input)).getTime(),
                //refreshMillis= 6e4, //A minute
                allowFuture = p_allowFuture || false,
                strings= {
                    prefixAgo: '',
                    prefixFromNow: '',
                    suffixAgo: "ago",
                    suffixFromNow: "from now",
                    seconds: "less than a minute",
                    minute: "about a minute",
                    minutes: "%d minutes",
                    hour: "about an hour",
                    hours: "about %d hours",
                    day: "a day",
                    days: "%d days",
                    month: "about a month",
                    months: "%d months",
                    year: "about a year",
                    years: "%d years"
                },
                dateDifference = nowTime - date,
                words,
                seconds = Math.abs(dateDifference) / 1000,
                minutes = seconds / 60,
                hours = minutes / 60,
                days = hours / 24,
                years = days / 365,
                separator = strings.wordSeparator === undefined ?  " " : strings.wordSeparator,
            
               
                prefix = strings.prefixAgo,
                suffix = strings.suffixAgo;
                
            if (allowFuture) {
                if (dateDifference < 0) {
                    prefix = strings.prefixFromNow;
                    suffix = strings.suffixFromNow;
                }
            }

            words = seconds < 45 && substitute(strings.seconds, Math.round(seconds), strings) ||
            seconds < 90 && substitute(strings.minute, 1, strings) ||
            minutes < 45 && substitute(strings.minutes, Math.round(minutes), strings) ||
            minutes < 90 && substitute(strings.hour, 1, strings) ||
            hours < 24 && substitute(strings.hours, Math.round(hours), strings) ||
            hours < 42 && substitute(strings.day, 1, strings) ||
            days < 30 && substitute(strings.days, Math.round(days), strings) ||
            days < 45 && substitute(strings.month, 1, strings) ||
            days < 365 && substitute(strings.months, Math.round(days / 30), strings) ||
            years < 1.5 && substitute(strings.year, 1, strings) ||
            substitute(strings.years, Math.round(years), strings);
      //console.log(prefix+words+suffix+separator);
      prefix.replace(/ /g, '')
      words.replace(/ /g, '')
      suffix.replace(/ /g, '')
      return (prefix+' '+words+' '+suffix+' '+separator);
            
        };
    });
