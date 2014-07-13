var theWaysApp = angular.module('theways', ['ngAnimate', 'ngTouch', 'ui.router']);
theWaysApp.config(function($stateProvider, $urlRouterProvider) {
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
    templateUrl: "partials/layout.html"
  })
  .state('ways.map', {
    url: "/ways/map",
    data: {position: "left"},
    views: {
      "map": {
        templateUrl: "partials/ways.map.html",
      }
    }
  })
  .state('ways.list', {
    url: "/ways/list",
    data: {position: "right"},
    views: {
      "list": {
        templateUrl: "partials/ways.list.html",
      }
    }
  })
  .state('ways.details', {
    url: "/ways/way",
    data: {position: "bottom"},
    views: {
      "details": {
        templateUrl: "partials/ways.details.html",
      }
    }
  })
})
/* Animation class magik */
.run(['$rootScope', '$state', function ($rootScope, $state) {
  
  $rootScope.navigateTo = function(state) {
    $state.go(state);
  }
  $rootScope.viewClasses = []
  $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams) {
    var viewClasses = [];
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

