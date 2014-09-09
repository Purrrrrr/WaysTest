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
