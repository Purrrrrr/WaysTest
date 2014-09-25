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
