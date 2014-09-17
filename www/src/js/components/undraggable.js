/**
 * @ngdoc directive
 * @name undraggable
 * @restrict A
 *
 * @description
 * The `undraggable` directive prevents click and touch events from bubbling up from an element, thus preventing the element from being draggable in the eyes slidable directives like `ionSlideBox`.
 *
 */
theWaysApp.directive('undraggable', 
['$ionicSlideBoxDelegate', function($ionicSlideBoxDelegate) {
  return {       
    restrict: 'A', 
    priority: 100,
    link: function postLink(originalScope, iElement, iAttrs) {
      //var events = ['mousedown', 'touchstart', 'touchmove', 'mousemove', 'touchend', 'mouseup'];
      var events = 'touchstart mousedown';
      iElement.on(events, function(e) {
        e.stopPropagation();
      });
    }
  };
}]);
