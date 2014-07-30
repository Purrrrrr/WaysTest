var theWaysApp = angular.module('theways', ['ngAnimate', 'ngTouch', 'ui.router', 'google-maps', 'ParseServices']);
theWaysApp.config(function($stateProvider, $urlRouterProvider) {
  // For any unmatched url, redirect to /state1
  $urlRouterProvider.otherwise("/splash");
  // Now set up the states
  $stateProvider
  .state('ways.splash', {
    url: "/splash",
    views: {
      "splash": {
        templateUrl: "partials/splash.html"
      }
    }
  })
  .state('ways', {
    abstract: true,
    templateUrl: "partials/layout.html"
  })
  .state('ways.map', {
    url: "/ways/map",
    data: {position: "top"},
    views: {
      "map": {
        templateUrl: "partials/ways.map.html",
        controller: 'MapController',
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
  })
})
/* Animation class magik */
.run(['$rootScope', '$state', function ($rootScope, $state) {
  var prevState = null;
  
  $rootScope.goBack = function() {
    if (!prevState) return;
      //console.log(prevState);
    $state.go(prevState);
  }
  $rootScope.navigateTo = function(state) {
    $state.go(state);
  }
  $rootScope.viewClasses = []
  $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams) {
    var viewClasses = [];
    prevState = fromState.name;
    if (fromState.data && fromState.data.position) {
      viewClasses.push("from-"+fromState.data.position);
    }
    if (toState.data && toState.data.position) {
      viewClasses.push("to-"+toState.data.position);
    }
    $rootScope.viewClasses = viewClasses;
 });
}])
.directive("uiView", function() {
  return {
    link: function(scope, elem, attrs) {
      elem.toggleClass("empty-view", elem.children().length == 0);
    }
  };
});

