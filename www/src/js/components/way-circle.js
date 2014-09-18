/**
 * @ngdoc directive
 * @name way
 * @restrict E
 *
 * @description
 * The `way` directive displays the icon and name of a way.
 * @param {string} name The name of the way
 *
 */
theWaysApp.directive('wayCircle', function() {
  return {       
    restrict: 'E', 
    /*scope: {
      name: "="
    },*/
    transclude: true,
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
