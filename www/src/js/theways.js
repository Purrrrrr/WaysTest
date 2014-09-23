var theWaysApp = angular.module('theways', 
  ['ngAnimate', 'ngTouch', 'ui.router', 'uiGmapgoogle-maps', 'ParseServices', 'ngCordova','ionic']);

theWaysApp.config(
       ['$stateProvider', '$urlRouterProvider', 
function($stateProvider,   $urlRouterProvider) {
  // For any unmatched url, redirect to /state1
  $urlRouterProvider.otherwise("/splash");
  // Now set up the states
  $stateProvider
  .state('splash', {
    url: "/splash",
    templateUrl: "partials/splashscreen.html"
  })
  .state('districts', {
    url: "/district",
    views: {
      "": {
        templateUrl: "partials/ways-browser/layout.html"
      },
      "districts@districts": {
        templateUrl: "partials/ways-browser/districts.html",
      }
    }
  })
  .state('districts.list', {
    url: "/:districtId",
    views: {
      "list@districts": {
        templateUrl: "partials/ways-browser/way-list.html",
        controller: 'WayListController',
      }
    }
  })
  .state('districts.list.way', {
    url: "/way/:wayId",
    views: {
      "way@districts": {
        templateUrl: "partials/ways-browser/way.html",
        controller: ['$scope', function($scope) {
          $scope.mapCenter = {
            "latitude":60.167466999999995,"longitude":24.929533000000003
          };
          $scope.way = {
            position:  {
              "latitude":60.167466999999995,"longitude":24.929533000000003
            },
            id: 2
          };
        }]
      }
    }
  })
  .state('districts.list.way.map_and_pic', {
    url: "/map_and_pic",
    views: {
      "way_details@districts": {
        templateUrl: "partials/ways-browser/map-and-pic.html",
        controller: ['$scope', function($scope) {
          $scope.mapCenter = {
            "latitude":60.167466999999995,"longitude":24.929533000000003
          };
          $scope.way = {
            position:  {
              "latitude":60.167466999999995,"longitude":24.929533000000003
            },
            id: 2
          };
        }]
      }
    }
  })
  .state('districts.list.way.details', {
    url: "/details",
    views: {
      "way_details@districts": {
        templateUrl: "partials/ways-browser/way-details.html",
      }
    }
  })
  .state('ways', {
    abstract: true,
    url: "/ways",
    templateUrl: "partials/browse-ways.html"
  })
  .state('ways.list', {
    url: "/list",
    views: {
      "list@ways": {
        controller: 'WayListController',
        templateUrl: "partials/way-list.html",
      }
    }
  })
  .state('ways.list.way', {
    url: "/way/:wayId",
    views: {
      "details@ways": {
        controller: 'WayController',
        templateUrl: "partials/way-details.html",
      }
    }
  });
}])
/* Animation class magik */
.run(['$rootScope', '$state', function ($rootScope, $state) {
  $rootScope.goUp = function() {
    $state.go("^");
  };
}]);
