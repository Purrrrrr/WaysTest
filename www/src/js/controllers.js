theWaysApp.controller('WayListController', 
       ['$scope', '$state', 'WaysService', 
function($scope,   $state,   WaysService) {
  $scope.gotoWay = function(way) {
    $state.go('ways.list.way', {wayId: way.id});
  };
  WaysService.getWays({}, "", function(ways) {
    $scope.ways = ways;
  });
}]);
theWaysApp.controller('MapController', 
       ['$scope', '$state', 'WaysService', 
function($scope,   $state,   WaysService) {
  $scope.map = {
    center: {
      latitude: 60.166667,
      longitude: 24.933333
    },
    zoom: 16,
  };
  $scope.gotoWay = function(way) {
    $state.go('ways.map.way', {wayId: way.id});
  };
  WaysService.getWays({}, "", function(ways) {
    $scope.wayMarkers = ways;
  });
}]);
theWaysApp.controller('WayController', 
       ['$scope', '$state', 'WaysService', 
function($scope,   $state,   WaysService) {
  WaysService.getWay($state.params.wayId, function(way) {
    $scope.way = way;
    $scope.mapCenter = _.clone(way.position);
  });
}]);
