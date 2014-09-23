theWaysApp.controller('WayListController', 
       ['$scope', '$state', 'WaysService', '$q',
function($scope,   $state,   WaysService, $q) {
  var districtId = $state.params.districtId;

  $scope.district = {
    name: districtId
  };
  $scope.loadWays = function() {
    // TODO: Real coupling with districts
    /* 
    if (!districtId) {
      return 
    } */
    return WaysService.getWays({});
  };

}]);
theWaysApp.controller('WayController', 
       ['$scope', '$state', 'WaysService', 
function($scope,   $state,   WaysService) {
  var wayId = $state.params.wayId;

  $scope.loadWay = function() {
    return WaysService.getWay(wayId).then(function(way) {
      $scope.mapCenter = _.clone(way.position);
      return way;
    });
  };

}]);
