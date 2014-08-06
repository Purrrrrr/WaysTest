theWaysApp.controller('WayListController', function($scope, $state, WaysService) {
  $scope.gotoWay = function(way) {
    $state.go('ways.list.way', {wayId: way.id});
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
    $state.go('ways.map.way', {wayId: way.id});
  };
  WaysService.getWays({}, "", function(ways) {
    $scope.wayMarkers = ways;
  });
});
theWaysApp.controller('WayController', function($scope, $state, WaysService) {
  console.log($state.params);

  WaysService.getWays({}, "", function(ways) {
    $scope.way = ways[0];
    $scope.mapCenter = _.clone($scope.way.position);
    console.log($scope.mapCenter);
  });
});
