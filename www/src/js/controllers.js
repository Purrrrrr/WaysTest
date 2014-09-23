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
       ['$scope', 'wayData',
function($scope, wayData) {
  $scope.loadWay = function() {
    return wayData.loader.then(function(way) {
      $scope.mapCenter = _.clone(way.position);
      return way;
    });
  };
}]);
theWaysApp.controller('WayDetailController',
       ['$scope', 'wayData',
function($scope, wayData) {
  $scope.loadWay = function() {
    return wayData.loader.then(function(way) {
      $scope.mapCenter = _.clone(way.position);
      return way;
    });
  };
}]);
