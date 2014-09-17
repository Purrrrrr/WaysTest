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
theWaysApp.directive('way', function() {
  return {       
    restrict: 'E', 
    scope: {
      name: "="
    },
    templateUrl: "partials/components/way-icon.html",
    link: function postLink(scope, iElement, iAttrs) {
      if (iAttrs.size) {
        iElement.children("div").addClass(iAttrs.size);
      }
    }
  };
});
