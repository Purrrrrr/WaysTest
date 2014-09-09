//A small HTML snippet that shows when the device is offline
theWaysApp.directive('networkMissingIndicator',
['OnlineStatusService', '$animate',
function(OnlineStatusService, $animate) {
  return {       
    restrict: 'E', 
    scope: true,
    templateUrl: "partials/components/network-missing-indicator.html",
    link: function postLink(scope, iElement, iAttrs) {
      //By default we do not show the indicator
      scope.isOnline = true;

      OnlineStatusService.watchOnlineStatus(function(isOnline) {
        console.log(isOnline);
        scope.isOnline = isOnline;
        console.log("digest");
        scope.$digest();
      });
    }
  };
}]);
