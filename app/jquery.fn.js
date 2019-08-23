/* global $ */
$(document).ready(function () {
  $('#loggedin-only').hide();
    
  $('.menu-drop').click(function(){
    //console.log('clicked');
      $('#settings').slideToggle("slow");
  }); 

  $('.about').append('Version: '+window.version);

  $('button.loginUser').click(function(){
    $('.loader').show();
    $('#login-form').hide();
    $('#loggedin-only').hide();
    console.log('login user');
    var userEmail = $('.user-email').val();
    var userPass = $('.user-pass').val();
      firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode,errorMessage);
      });
  });

  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      // User is signed in.
      var displayName = user.displayName;
      var email = user.email;
      var emailVerified = user.emailVerified;
      var photoURL = user.photoURL;
      var isAnonymous = user.isAnonymous;
      var uid = user.uid;
      var providerData = user.providerData;
      //console.log(user);
      $('button.logoutUser').show();
      setTimeout(function(){
        $('#loggedin-only').show();
        $('.loader').hide();
      },500);
      
    } else {
      // User is signed out.
      $('#login-form').show();
      $('.loader').hide();
    }
  });

  $('button.logoutUser').click(function(){
    console.log('logout user');
    $('.loader').show();
    firebase.auth().signOut().then(function () {
      // Sign-out successful.
      $('#loggedin-only').hide();
      $('#login-form').hide();
      //window.location.reload(true);
    }).catch(function (error) {
      // An error happened.
    });
  });
    
// end jquery
});