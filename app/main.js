var deferredPrompt;
var enableNotificationsButtons = document.querySelectorAll('.enable-notifications');
var installAppButtons = document.querySelectorAll('.install-app');

if (!window.Promise) {
  window.Promise = Promise;
}

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/sw.js')
    .then(function () {
      console.log('Service worker registered!');
    })
    .catch(function(err) {
      console.log(err);
    });
}

window.addEventListener('beforeinstallprompt', function(event) {
  console.log('beforeinstallprompt fired');
  //event.preventDefault();
  //deferredPrompt = event;
  // for (var i = 0; i < installAppButtons.length; i++) {
  //   installAppButtons[i].style.display = 'block';
  // }
});

// function displayConfirmNotification() {
//   if ('serviceWorker' in navigator) {
//     var options = {
//       body: 'You successfully subscribed to our Notification service!',
//       icon: '/src/images/icons/app-icon-96x96.png',
//       image: '/src/images/sf-boat.jpg',
//       dir: 'ltr',
//       lang: 'en-US', // BCP 47,
//       vibrate: [100, 50, 200],
//       badge: '/src/images/icons/app-icon-96x96.png',
//       tag: 'confirm-notification',
//       renotify: true,
//       actions: [
//         { action: 'confirm', title: 'Okay', icon: '/src/images/icons/app-icon-96x96.png' },
//         { action: 'cancel', title: 'Cancel', icon: '/src/images/icons/app-icon-96x96.png' }
//       ]
//     };

//     navigator.serviceWorker.ready
//       .then(function(swreg) {
//         swreg.showNotification('Successfully subscribed!', options);
//         configurePushSub();
//       });
//   }
// }

// function configurePushSub() {
//   if (!('serviceWorker' in navigator)) {
//     return;
//   }

//   var reg;
//   navigator.serviceWorker.ready
//     .then(function(swreg) {
//       reg = swreg;
//       return swreg.pushManager.getSubscription();
//     })
//     .then(function(sub) {
//         console.log('sub: ',sub);
//       if (sub === null) {
//         // Create a new subscription
//         var vapidPublicKey = 'BC1qaKiOtzHYJ_1ZC0pODkVDMuwa-8VHkxNawBvVKBRDkrauLrb0B9Lj5u9TiBm9HjJYo-io_MWSSSn2fii3YW4';
//         var convertedVapidPublicKey = urlBase64ToUint8Array(vapidPublicKey);
//         return reg.pushManager.subscribe({
//           userVisibleOnly: true,
//           applicationServerKey: convertedVapidPublicKey
//         });

//       } else {
//         // We have a subscription
//         console.log('existing sub');
//         for (var i = 0; i < enableNotificationsButtons.length; i++) {
//           //enableNotificationsButtons[i].innerHTML = 'Already enabled!';
//           enableNotificationsButtons[i].checked = true;
//           enableNotificationsButtons[i].disabled = true;
//         }
//         return 'exists';
//       }
//     })
//     .then(function(newSub) {
//         if(newSub!=='exists'){
//             return fetch('https://whiteflagmobile.com/api/push/sub', {
//                 method: 'POST',
//                 headers: {
//                   'Content-Type': 'application/json',
//                   'Accept': 'application/json'
//                 },
//                 body: JSON.stringify(newSub)
//             })
//         }else{
//             return 'exists';
//         }
//     })
//     .then(function(res) {
//       if (res!=='exists' && res.ok) {
//         displayConfirmNotification();
//       }
//     })
//     .catch(function(err) {
//       console.log(err);
//     });
// }

// function askForNotificationPermission() {
//   Notification.requestPermission(function(result) {
//     console.log('User Choice', result);
//     if (result !== 'granted') {
//       console.log('No notification permission granted!');
//     } else {
//       configurePushSub();
//       //ga('send', { hitType: 'event', eventCategory: 'PushNotifications', eventAction: 'enable', eventLabel: 'PushSubs' });
//       // displayConfirmNotification();
//     }
//   });
// }

// function installAppToHomescreen(){
//   console.log('install button clicked');
//   deferredPrompt.prompt();
//   deferredPrompt.userChoice
//   .then((choiceResult) => {
//     if (choiceResult.outcome === 'accepted') {
//         console.log('User accepted the A2HS prompt');
//         //ga('send', { hitType: 'event', eventCategory: 'AppInstalls', eventAction: 'install', eventLabel: 'WhiteFlagPWA' });
//       } else {
//         console.log('User dismissed the A2HS prompt');
//         //ga('send', { hitType: 'event', eventCategory: 'AppInstalls', eventAction: 'decline', eventLabel: 'WhiteFlagPWA' });
//       }
//       deferredPrompt = null;
//     });
// }

// window.addEventListener('appinstalled', (evt) => {
//   for (var i = 0; i < installAppButtons.length; i++) {
//     installAppButtons[i].innerHTML = 'Already installed!';
//     installAppButtons[i].style.display = 'none';
//   }
// });

window.addEventListener('appinstalled', (evt) => {
  console.log('appinstalled fired');
  //ga('send', { hitType: 'event', eventCategory: 'AppInstalls', eventAction: 'install', eventLabel: 'WhiteFlagPWA' });
});

function urlBase64ToUint8Array(base64String) {
  var padding = '='.repeat((4 - base64String.length % 4) % 4);
  var base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  var rawData = window.atob(base64);
  var outputArray = new Uint8Array(rawData.length);

  for (var i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

// if ('Notification' in window && 'serviceWorker' in navigator) {
//   for (var i = 0; i < enableNotificationsButtons.length; i++) {
//     enableNotificationsButtons[i].style.display = 'inline-block';
//     enableNotificationsButtons[i].addEventListener('click', askForNotificationPermission);
//   }
// }

// if(deferredPrompt){
//   for (var i = 0; i < installAppButtons.length; i++) {
//     installAppButtons[i].addEventListener('click',installAppToHomescreen);
//   }
// }
// configurePushSub();