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
theWaysApp.service('WaysService', ['ParseSDK', '$q', function(ParseSDK, $q) {
  // TODO: Some caching system could be nice  
  var self = this;
 
  this.getWays = function(position) {
    var deferred = $q.defer();
    ParseSDK.getWays(position, "", function(objs) {
      deferred.resolve(objs);
    }, function(err) {
      deferred.reject(err);
    });

    return deferred.promise;
  };
  this.getRandomWay = function() {
    return self.getWays({}).then(function(ways) {
      if (ways.length === 0) {
        return $q.reject("No ways found");
      }
      return ways[_.random(ways.length-1)];
    });
  };
  this.getWay = function(id, successFunc) {
    var deferred = $q.defer();
    ParseSDK.getWay(id, function(obj) {
      deferred.resolve(obj);
    }, function(err) {
      deferred.reject(err);
    });

    return deferred.promise;
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
