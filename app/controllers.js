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
    let vm = $scope;
    vm.currentCtx = 0;
    vm.newNoteData = {title:null,content:null};
    vm.editNoteData = {title:null,content:null};
    vm.newCntxData = {title:null};
    vm.err = 0;
    vm.errMsgs = [];
    vm.errMsgsCntx = [];
    vm.defaultTitles = ['Notes','Thoughts','Things','Bits','Snippets','Blips','Blurbs'];
    vm.currentTitle = vm.defaultTitles[Math.floor(Math.random()*vm.defaultTitles.length)];

    vm.setFilter = function(ctx){
      var thisCntx = vm.cntxs.filter((el) => el._id == ctx);
      //console.log('thisCntx',thisCntx);
      if($('.new-note').css('display')=='block'){
        vm.toggle('.new-note');
      }
      if(thisCntx && thisCntx[0]){
        vm.currentCtx = thisCntx[0];
      }else{
        vm.currentCtx = null;
      }
      if(ctx == null){
        getNotes();
      }else{
        getNotesByCntx(vm.currentCtx._id);
      }
    };

    vm.newNote = function(){
      var data = {};
      data.content = toErr(vm.newNoteData.content,'Required: Note content is empty');
      data.cntxId = vm.currentCtx._id;
      data.ts = createTS();
      console.log(data);
      if(vm.err==0){
        DataService.addDoc('notes',data).then(function(resp){
          console.log(resp);
          vm.toggle('.new-note');
          getNotesByCntx(vm.currentCtx._id);
        });
      }else{
        vm.toggle('.errors');
        vm.newNoteData = null;
        $('.new-note-save').prop('disabled', true);
      }
    }

    vm.deleteNote = function(nid){
      var verify = confirm('Are you sure you want to delete this note?');
      if(verify){
        console.log('Ka-boom! implosion of note');
        DataService.deleteDoc('notes',nid).then(function(resp){
          console.log(resp);
          if(vm.currentCtx){
            getNotesByCntx(vm.currentCtx._id);
          }else{
            getNotes();
          }
        });
      }else{
        console.log('then again maybe not');
      }
    }

    vm.editNote = function(nid){
      vm.toggle('.new-note','.new-note-editor');
      vm.newNoteData = filterNoteById(nid);
      vm.isEditNote = true;
    }


    vm.updNote = function(){
      console.log(vm.newNoteData);
      var data = {};
      data.content = toErr(vm.newNoteData.content,'Required: Note content is empty');
      data.cntxId = vm.newNoteData.cntxId;
      data._id = vm.newNoteData._id;
      //data.ts = createTS();
      console.log(data);
      if(vm.err==0){
        DataService.updateDoc('notes',data._id,data).then(function(resp){
          console.log(resp);
          vm.toggle('.new-note');
          if(vm.currentCtx){
            getNotesByCntx(vm.currentCtx._id);
          }else{
            getNotes();
          }
        });
      }else{
        vm.toggle('.errors');
        vm.newNoteData = null;
        $('.new-note-save').prop('disabled', true);
      }
    }

    vm.newCntx = function(){
      var data = {};
      data.name = toErr(vm.newCntxData.title,'Required: Cntx name is blank');
      data.ts = createTS();
      data.ord = vm.cntxs.length + 1;
      console.log(data);
      if(vm.err==0){
        DataService.addDoc('cntxs',data).then(function(resp){
          console.log(resp);
          vm.toggle('.new-cntx');
          vm.newCntxData = null;
          getCntxs();
        });
      }else{
        vm.toggle('.errors-cntx');
        vm.newCntxData = null;
        $('.new-cntx-save').prop('disabled', true);
      }
    }

    vm.reorderCntx = function(){
      console.log($scope.cntxs);
      let cnt = 0;
      $scope.cntxs.forEach(element => {
        element.ord = cnt;
        DataService.updateDoc('cntxs',element._id,element).then(function(resp){
          console.log(resp);
        });
        cnt++;
      });
    }

    vm.deleteCntx = function(currCntx){
      var verify = confirm('Are you sure you want to delete '+currCntx.name+'? \r\n (Orphaned notes will not be deleted)');
      if(verify){
        console.log('Ka-boom! implosion of cntx');
        DataService.deleteDoc('cntxs',currCntx._id).then(function(resp){
          console.log(resp);
          getCntxs();
        });
      }else{
        console.log('then again maybe not');
      }
    }

    function toErr(value,msg){
      if(value){
        return value;
      }else{
        vm.err++;
        vm.errMsgs.push(msg);
        return null;
      }
    }

    vm.toggle = function(toggleSelector,clearControl){
      $(toggleSelector).toggle();
      if(toggleSelector=='.new-note' && clearControl){
        vm.newNoteData = null;
      }
    }

    vm.toggleChild = function(toggleSelector,parent){
      //console.log('#note_'+parent+' '+toggleSelector);
      $('#note_'+parent+' '+toggleSelector).toggle();
    }

    function createTS(){
      var today = new Date();
      var dd = today.getDate();
      var mm = today.getMonth() + 1; //January is 0!
      var yyyy = today.getFullYear();
      if (dd < 10) {dd = '0' + dd;} 
      if (mm < 10) {mm = '0' + mm;} 
      var h = today.getHours();
      var m = today.getMinutes();
      var s = today.getSeconds();
      var today = yyyy+'-'+mm+'-'+dd+' '+h+':'+m+':'+s;
      return today;
    }

    function getNotes(){
      DataService.getList('notes').then(function(resp){
        console.log('Notes: ',resp);
        vm.notes = resp;
      });
    }

    function getNotesByCntx(ctx){
      if(ctx){
        DataService.getListByCntx('notes',ctx).then(function(resp){
          console.log('Notes: ',resp);
          vm.notes = resp;
        });
      }else{
        console.log('no ctx id sent');
        getNotes();
      }
    }
    
    function getCntxs(){
      DataService.getList('cntxs').then(function(resp){
        console.log('Cntxs: ',resp);
        vm.cntxs = resp;
      });
    }

    function filterNoteById(nid){
      var thisnote = vm.notes.filter((el) => el._id == nid)
      //console.log(thisnote[0]);
      return thisnote[0];
    }

    // init
    getCntxs();
    getNotes();
}]);



// Email
//////////////////////////////////////////////////////////
angular.module('alloy.form',[])

.config(['$routeProvider',function($routeProvider) {
  $routeProvider.when('/form', { templateUrl: 'form.html', controller: 'FormCtrl' });
}])

.controller('FormCtrl', ['$scope','$http','DataService', function($scope, $http, DataService) {
  let vm = $scope;
  vm.blanks = [undefined,null,''];
  vm.emailError = false;
  vm.emailData = {
    subject: '',
    to: '',
    from: '',
    html: ''
  };

  vm.prepEmailRequest = function(){
    vm.emailError = false;
    vm.emailHtml = '';
    vm.emailHtml += "<div>Form details:</div><br /><br />";
    if(vm.blanks.indexOf(vm.emailName)==-1){
      vm.emailHtml += '<div><b>Name:</b>&nbsp;&nbsp;' + vm.emailName + '</div>';
    }
    if(vm.blanks.indexOf(vm.emailEmail)==-1){
      vm.emailHtml += '<div><b>Email:</b>&nbsp;&nbsp;' + vm.emailEmail; + '</div>';
    }
    if(vm.blanks.indexOf(vm.emailPhone)==-1){
      var phone = vm.emailPhone;
      vm.emailHtml += '<div><b>Phone:</b>&nbsp;' + vm.emailPhone; + '</div>';
    }
    if(vm.blanks.indexOf(vm.emailRequest)==-1){
      vm.emailHtml += '<div><b>Content:</b><br />' + vm.emailRequest; + '</div>';
      vm.sendEmailRequest();
    }else{
      vm.emailError = true;
    }
  }

  vm.sendEmailRequest = function(){
    vm.emailData.html = vm.emailHtml;
    var emailData = vm.emailData;
    DataService.sendMail(emailData)
    .then(function(resp){
      console.log(resp);
      if(resp=='OK'){
        vm.emailSentMsg = 'Your email was sent.';
      }else{
        vm.emailSentMsg = 'Sorry, something went wrong and your email was not sent.';
      }
      vm.showResult = true;
    });

  }

  vm.resetEmailForm = function(){
    vm.emailHtml = '';
    vm.emailName = null;
    vm.emailEmail = null;
    vm.emailPhone = null;
    vm.emailRequest = null;
    vm.showResult = false;
    window.scrollTo(0,1);
  }
}]);

// filters
angular.module('alloy').filter('timeago', function() {
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