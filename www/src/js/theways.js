var theWaysApp = angular.module('theways', 
  ['ngAnimate', 'ngTouch', 'ui.router', 'uiGmapgoogle-maps', 'ParseServices', 'ngCordova','ionic', 'theways.positioning']);

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
    url: "/ways",
    views: {
      "": {
        templateUrl: "partials/ways-browser/layout.html"
      },
      "districts@districts": {
        templateUrl: "partials/ways-browser/districts.html",
        controller: 'DistrictsController',
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
  });

  var wayState = {
    url: "/way/:wayId",
    resolve: {
      wayData: ['$stateParams', 'WaysService', function($stateParams, WaysService) {
        return {
          loader: WaysService.getWay($stateParams.wayId)
        };
      }]
    },
    views: {
      "way@districts": {
        templateUrl: "partials/ways-browser/way.html",
        controller: 'WayController',
      }
    }
  };
  var wayMapState = {
    url: "/map_and_pic",
    views: {
      "way_details@districts": {
        templateUrl: "partials/ways-browser/map-and-pic.html",
        controller: 'WayDetailController'
      }
    }
  };
  var wayDetailsState = {
    url: "/details",
    views: {
      "way_details@districts": {
        templateUrl: "partials/ways-browser/way-details.html",
        controller: 'WayDetailController'
      }
    }
  };

  $stateProvider
  .state('districts.list.way', wayState)
  .state('districts.list.way.map_and_pic', wayMapState)
  .state('districts.list.way.details', wayDetailsState)
  .state('districts.randomWay', {
    url: "^/randomWay",
    resolve: {
      wayData: ['WaysService', function(WaysService) {
        return {
          loader: WaysService.getRandomWay()
        };
      }]
    },
    views: wayState.views
  })
  .state('districts.randomWay.map_and_pic', wayMapState)
  .state('districts.randomWay.details', wayDetailsState);
}]);
