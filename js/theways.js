var app = angular.module('theways', ['ngRoute', 'ui.bootstrap', 'ui.bootstrap.typeahead', 'ui.bootstrap.datepicker']);

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
