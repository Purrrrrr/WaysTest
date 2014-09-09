var theWaysApp = angular.module('theways', 
  ['ngAnimate', 'ngTouch', 'ui.router', 'uiGmapgoogle-maps', 'ParseServices', 'ngCordova']);

theWaysApp.config(
       ['$stateProvider', '$urlRouterProvider', 
function($stateProvider,   $urlRouterProvider) {
  // For any unmatched url, redirect to /state1
  $urlRouterProvider.otherwise("/splash");
  // Now set up the states
  $stateProvider
  .state('splash', {
    url: "/splash",
    templateUrl: "partials/splash.html"
  })
  .state('ways', {
    abstract: true,
    url: "/ways",
    templateUrl: "partials/wayslayout.html"
  })
  .state('ways.map', {
    url: "/map",
    data: {position: "top"},
  })
  .state('ways.list', {
    url: "/list",
    data: {position: "bottom"},
  })
  .state('ways.map.way', {
    url: "/way/:wayId",
    data: {position: "top", details: true},
    views: {
      "details@ways": {
        controller: 'WayController',
        templateUrl: "partials/ways.details.html",
      }
    }
  }) 
  .state('ways.list.way', {
    url: "/way/:wayId",
    data: {position: "bottom", details: true},
    views: {
      "details@ways": {
        controller: 'WayController',
        templateUrl: "partials/ways.details.html",
      }
    }
  });
}])
/* Animation class magik */
.run(['$rootScope', '$state', function ($rootScope, $state) {
  $rootScope.goUp = function() {
    $state.go("^");
  };

  $rootScope.viewClasses = [];
  $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams) {

    var viewClasses = [];
    if (toState.data) {
      if (toState.data.position) {
        viewClasses.push("position-"+toState.data.position);
      }
      if (toState.data.details) {
        viewClasses.push("show-details");
      }
    }
    $rootScope.viewClasses = viewClasses;
 });
}])
.directive("uiView", function() {
  return {
    link: function(scope, elem, attrs) {
      elem.toggleClass("empty-view", elem.children().length === 0);
    }
  };
});
