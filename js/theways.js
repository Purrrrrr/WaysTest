var theWaysApp = angular.module('theways', ['ngAnimate', 'ui.router']);
theWaysApp.config(function($stateProvider, $urlRouterProvider) {
  // For any unmatched url, redirect to /state1
  $urlRouterProvider.otherwise("/home");
  // Now set up the states
  $stateProvider
  .state('home', {
    url: "/home",
    templateUrl: "partials/home.html"
  })
  .state('ways', {
    url: "/ways",
    templateUrl: "partials/ways.html"
  })
  .state('ways.way', {
    url: "/way",
    templateUrl: "partials/way.html",
    controller: function($scope) {
      $scope.items = ["A", "List", "Of", "Items"];
    }
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
});
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
