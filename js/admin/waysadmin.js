var adminApp = angular.module('theways', ['ui.router', 'google-maps', 'ParseServices']);
adminApp.config(function($stateProvider, $urlRouterProvider) {
  // For any unmatched url, redirect to /state1
  $urlRouterProvider.otherwise("/home");
  // Now set up the states
  $stateProvider
  .state('home', {
    url: "/home",
    templateUrl: "partials/admin/list.html",
    controller: function($scope, ParseSDK, MockWays) {
      ParseSDK.getWays(0,0,function(ways) {
        $scope.ways = ways;
        //$scope.$digest();
        console.log(ways);
      });

      $scope.generate = function() {
        var ways = MockWays.getWays();
        console.log(ways);
        ParseSDK.saveWays(ways, function() {
          $scope.ways = ways;
          console.log("ok");
        });
        
      }
    }
  })
  /*
  .state('ways.map', {
    url: "/ways/map",
    data: {position: "top"},
    views: {
      "map": {
        templateUrl: "partials/ways.map.html",
      }
    }
  })
  .state('ways.list', {
    url: "/ways/list",
    data: {position: "bottom"},
    views: {
      "list": {
        templateUrl: "partials/ways.list.html",
        controller: 'WayListController',
      }
    }
  })
  .state('ways.details', {
    url: "/ways/way",
    data: {position: "right"},
    views: {
      "details": {
        controller: 'WayController',
        templateUrl: "partials/ways.details.html",
      }
    }
    }) */

})
