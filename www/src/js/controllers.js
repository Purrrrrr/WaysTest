theWaysApp.controller('WayListController', 
       ['$scope', '$state', 'WaysService', 
function($scope,   $state,   WaysService) {
  $scope.gotoWay = function(way) {
    $state.go('ways.list.way', {wayId: way.id});
  };
  $scope.loadWays = function() {
    return WaysService.getWays({});
  };
}]);
theWaysApp.controller('WayController', 
       ['$scope', '$state', 'WaysService', 
function($scope,   $state,   WaysService) {
  $scope.loadWay = function() {
    return WaysService.getWay($state.params.wayId).then(function(way) {
      $scope.mapCenter = _.clone(way.position);
      return way;
    });
  };
}]);
