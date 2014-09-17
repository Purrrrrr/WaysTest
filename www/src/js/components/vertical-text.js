/**
 * @ngdoc directive
 * @name verticalText
 * @restrict A
 *
 * @description
 * The `verticalText` directive displays a value vertically
 * using br tags to insert a newline between all the characters
 * in the given string.
 *
 * @param {expression} verticalText The value to show vertically.
 */
theWaysApp.directive('verticalText', 
[function() {
  return {       
    restrict: 'A', 
    scope: {
      verticalText: "="
    },
    link: function postLink(scope, element, attrs) {
      scope.$watch('verticalText', function(text) {
        var rotated = text.replace(/(.)(?!$)/g, '$1<br>');
        element.html(rotated);
      });
    }
  };
}]);
