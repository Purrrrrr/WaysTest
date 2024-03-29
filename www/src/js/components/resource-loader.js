/**
 * @ngdoc directive
 * @name resourceLoader
 * @restrict EA
 *
 * @description
 * The `resourceLoader` directive loads a resource using a function parameter 
 * given to it and on success makes it available to the scope and the directives within it.
 * On a network failure an error screen is shown and while the resource is loading
 * a loading screen appears.
 *
 * @param {expression} resourceLoader An expression that should return a promise giving the data from the resource being loaded.
 * @param {string} loadIntoModel The name to bind the results of the resource loading to. The results are bound by default to the parent scope of the directive.
 */
theWaysApp.directive('resourceLoader', ['$q', function($q) {

  return {       
    transclude: true,
    scope: {
      resourceLoader: "=",
      loadIntoModel: "@",
    },
    templateUrl: "partials/components/resource-loader.html",
    link: function postLink(scope, iElement, iAttrs, controller, transcludeFn) {
      //Resource content div
      var containerElem = angular.element(iElement.children()[0]);

      function showResource(res) {
        containerElem.empty();
        var childScope = scope.$parent;
        if (scope.loadIntoModel) {
          childScope[scope.loadIntoModel] = res;
        }
        transcludeFn(childScope, function(cloned) {
          containerElem.append(cloned);
        });
      }

      scope.$watch('resourceLoader', function(factory) {
        containerElem.empty();
        scope.reloadFn = function() {
          scope.status = 'loading';
          scope.promise = factory().then(function (response) {
            if (response) {
              scope.status = 'success';
              scope.resource = response;
              showResource(response);
            } else {
              scope.status = 'notfound';
            }
            return response;
          }, function (response) {
            scope.status = 'fail';
            console.log(response);
            return $q.reject(response);
          });
        };
        scope.reloadFn();

      });
    }
  };
}]);
