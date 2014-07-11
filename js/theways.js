var theWaysApp = angular.module('theways', ['ngAnimate', 'ui.router']);
theWaysApp.config(function($stateProvider, $urlRouterProvider) {
  // For any unmatched url, redirect to /state1
  $urlRouterProvider.otherwise("/splash");
  // Now set up the states
  $stateProvider
  .state('splash', {
    url: "/splash",
    templateUrl: "partials/splash.html"
  })
  .state('stack', {
    abstract: true,
    templateUrl: "partials/layout.html"
  })
  .state('stack.ba', {
    url: "/ba",
    data: {depth: 1},
    template: "<h1>BA</h1><ui-view ng-class='animationClasses' class='toggle'/>"
  })
  .state('stack.aa', {
    url: "/aa",
    data: {depth: 2},
    template: "<h1>AA</h1><ui-view ng-class='animationClasses' class='toggle'/>"
  })
  .state('stack.aa.bb', {
    url: "/bb",
    template: "<h1>BB</h1><ui-view ng-class='animationClasses' class='toggle'/>"
  })
  .state('stack.aa.bb.cc', {
    url: "/cc",
    template: "<h1>CC</h1><ui-view ng-class='animationClasses' class='toggle'/>"
  })
  .state('stack.aa.bb.bb', {
    url: "/bb",
    template: "<h1>BB</h1><ui-view/>"
  }) .state('stack.home', {
    url: "/home",
    templateUrl: "partials/home.html"
  })
  .state('results', {
    url: "/results",
    templateUrl: "partials/results.html",
    }) 
  .state('way', {
    url: "/way",
    templateUrl: "partials/results.way.html",
    }) 
  .state('results.way', {
    url: "/way",
    templateUrl: "partials/results.way.html",
    }) 
   /*
  .state('state2', {
    url: "/state2",
    templateUrl: "partials/state2.html"
  })
  .state('state2.list', {
    url: "/list",
    templateUrl: "partials/state2.list.html",
    controller: function($scope) {
      $scope.things = ["A", "Set", "Of", "Things"];
    }
  })
  */
}).run(['$rootScope', '$state', function ($rootScope, $state) {
  
  $rootScope.animationClasses = ['toggle']
  $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams) {
    var depth = function(state) {
      return state.name.split(".").length;
    };
    var fromDepth = fromState.data ? fromState.data.depth : 0;
    var toDepth = toState.data ? toState.data.depth : 0;

    if (fromDepth > toDepth) {
      $rootScope.animationClasses = ["sliding", "sliding-from-right"]
    } else {
      $rootScope.animationClasses = ['toggle',    ]
    }
    /**/

     console.log(fromDepth+"->"+toDepth);
     console.log(toState);
     console.log(toParams);
 });

}]);

/*
app.config(['$routeProvider', '$httpProvider', function($routeProvider, $httpProvider) {
        $routeProvider.when('/', {
            controller: 'MainController',
            templateUrl: 'partials/main.html'
        }).when('/students', {
            controller: 'StudentsController',
            templateUrl: 'partials/students.html'
        }).when('/students/:studentNumber', {
            controller: 'StudentController',
            templateUrl: 'partials/student.html'
        }).otherwise({redirectTo: '/'});
        
        $httpProvider.defaults.withCredentials = true;

      }]);

app.controller("MainController", function($scope, $filter) {

});
*/
