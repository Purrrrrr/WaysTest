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
    templateUrl: "partials/splashscreen.html"
  })
  .state('ways', {
    abstract: true,
    url: "/ways",
    templateUrl: "partials/browse-ways.html"
  })
  .state('ways.list', {
    url: "/list",
  })
  .state('ways.list.way', {
    url: "/way/:wayId",
    data: {details: true},
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

  $rootScope.viewClasses = [];
  $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams) {

    var viewClasses = [];
    if (toState.data) {
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
