/** Implements the grayscale coloring of the ways map */
theWaysApp.directive('undraggable', 
[function() {
  return {       
    restrict: 'A', 
    priority: 100,
    link: function postLink(originalScope, iElement, iAttrs, mapController) {
      //var events = ['mousedown', 'touchstart', 'touchmove', 'mousemove', 'touchend', 'mouseup'];
      var events = 'touchmove, mousemove';
      iElement.on(events, function(e) {
        e.stopPropagation();
      });
    }
  };
}]);
