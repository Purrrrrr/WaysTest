theWaysApp.controller('WayListController', function($scope, $state, WaysService) {
  $scope.gotoWay = function(way) {
    $state.go('ways.details');
  };
  WaysService.getWays({}, "", function(ways) {
    $scope.ways = ways;
  });
});
theWaysApp.controller('MapController', function($scope, $state, WaysService) {
  $scope.map = {
    center: {
      latitude: 60.166667,
      longitude: 24.933333
    },
    zoom: 16,
  };
  $scope.gotoWay = function(way) {
    $state.go('ways.details');
  };
  WaysService.getWays({}, "", function(ways) {
    $scope.wayMarkers = ways;
  });
});
