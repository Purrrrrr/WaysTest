/** Implements the grayscale coloring of the ways map */
theWaysApp.directive('undraggable', 
['$ionicSlideBoxDelegate', function($ionicSlideBoxDelegate) {
  return {       
    restrict: 'A', 
    priority: 100,
    link: function postLink(originalScope, iElement, iAttrs, mapController) {
      //var events = ['mousedown', 'touchstart', 'touchmove', 'mousemove', 'touchend', 'mouseup'];
      var events = 'touchstart mousedown';
      iElement.on(events, function(e) {
        e.stopPropagation();
      });
    }
  };
}]);
