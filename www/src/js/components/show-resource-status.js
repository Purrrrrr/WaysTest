theWaysApp.directive('showResourceStatus', [function() {
  return {       
    transclude: true,
    scope: {
      showResourceStatus: "=",
      onReload: "@"
    },
    templateUrl: "partials/components/show-resource-status.html",
    link: function postLink(scope, iElement, iAttrs, controller, transcludeFn) {
      scope.status = 'loading';
      scope.showResourceStatus.then(function (response) {
        scope.status = 'success';
        return response;
      }, function (response) {
        scope.status = 'fail';
        return $q.reject(response);
      });

    }
  };
}]);
