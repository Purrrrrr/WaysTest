//A small service to watch the device online status
theWaysApp.service('OnlineStatusService', 
['$cordovaNetwork', '$rootScope',
function($cordovaNetwork, $rootScope) {
  var scope = $rootScope.$new();
  var isReady = false;
  var isOnline;

  document.addEventListener("deviceready", function() {
    console.log(navigator.connection);
    console.log($cordovaNetwork);
    isOnline = $cordovaNetwork.isOnline();
    document.addEventListener("online", function() {
      isOnline = false;
      scope.$broadcast('online-status-change', {isOnline: isOnline});
    }, false);
    document.addEventListener("online", function() {
      isOnline = true;
      scope.$broadcast('online-status-change', {isOnline: isOnline});
    }, false);

    isReady = true;
    scope.$broadcast('online-status-change', {isOnline: isOnline});
  });

  this.watchOnlineStatus = function(callback) {
    scope.$on('online-status-change', function(e, data) {
      callback(data.isOnline);
    });
    if (isReady) {
      callback(isOnline);
    }
  };
}]);
theWaysApp.service('WaysService', ['ParseSDK', function(ParseSDK) {
  // TODO: Some caching system could be nice  
 
  this.getWays = function(position, search, successFunc) {
    ParseSDK.getWays(position, search, successFunc, function() {});
  };
  this.getWay = function(id, successFunc) {
    ParseSDK.getWay(id, successFunc, function() {});
  };
  
  /*
  //Calculates the distance between to points
  var R = 6371; // km
  var φ1 = lat1.toRadians();
  var φ2 = lat2.toRadians();
  var Δφ = (lat2-lat1).toRadians();
  var Δλ = (lon2-lon1).toRadians();

  var a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
  Math.cos(φ1) * Math.cos(φ2) *
  Math.sin(Δλ/2) * Math.sin(Δλ/2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

  var d = R * c;
  */
}]);
theWaysApp.service('BackgroundService', function() {

});
