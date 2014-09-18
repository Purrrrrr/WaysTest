/**
 * @ngdoc directive
 * @name wayCircle
 * @restrict E
 *
 * @description
 * The `wayCircle` directive displays the icon and circle of a way.
 *
 */
theWaysApp.directive('wayCircle', function() {
  return {       
    restrict: 'E', 
    scope: {
    },
    transclude: true,
    /*scope: {
      name: "="
    },*/
    templateUrl: "partials/components/way-circle.html",
    link: function postLink(scope, iElement, iAttrs) {
      /*
      if (iAttrs.size) {
        iElement.children("div").addClass(iAttrs.size);
      }
      */
    }
  };
});
