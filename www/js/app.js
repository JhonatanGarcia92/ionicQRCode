var qrCodeApp = angular.module('starter', ['ionic', 'ngCordova', 'ngStorage'])

qrCodeApp.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});


qrCodeApp.controller("QRCodeController", function($scope, $cordovaBarcodeScanner, StorageService) {
    console.log('1111');
    $scope.contacts = StorageService.getAll();
    
    $scope.add = function (contact) {
      StorageService.add(contact);
    };
    
    $scope.remove = function (contact) {
      StorageService.remove(contact);
    };

    $scope.scanBarcode = function() {
        $cordovaBarcodeScanner.scan().then(function(imageData) {
          alert(imageData.text);
          console.log("Barcode Format -> " + imageData.format);
          console.log("Cancelled -> " + imageData.cancelled);
        }, function(error) {
            console.log("An error happened -> " + error);
        });
    };
 
});

// create a new factory
qrCodeApp.factory('StorageService', function ($localStorage) {

  $localStorage = $localStorage.$default({
    contacts: []
  });

  var _getAll = function () {
    return $localStorage.contacts;
  };
  var _add = function (contact) {
    $localStorage.contacts.push(contact);
  }
  var _remove = function (contact) {
    $localStorage.contacts.splice($localStorage.contacts.indexOf(contact), 1);
  }
  return {
      getAll: _getAll,
      add: _add,
      remove: _remove
    };
});



