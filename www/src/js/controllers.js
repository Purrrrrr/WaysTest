theWaysApp.controller('WayListController', 
       ['$scope', '$state', 'WaysService', 
function($scope,   $state,   WaysService) {
  $scope.gotoWay = function(way) {
    $state.go('ways.list.way', {wayId: way.id});
  };
  $scope.load = function() {
    console.log("Loading");
    $scope.waysPromise = WaysService.getWays({}).then(function(ways) {
      $scope.ways = ways;
    });
  };
  $scope.load();
}]);
theWaysApp.controller('WayController', 
       ['$scope', '$state', 'WaysService', 
function($scope,   $state,   WaysService) {
  $scope.wayPromise = WaysService.getWay($state.params.wayId).then(function(way) {
    $scope.way = way;
    $scope.mapCenter = _.clone(way.position);
  });
}]);
