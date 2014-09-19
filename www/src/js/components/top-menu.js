/**
 * @ngdoc directive
 * @name topMenu
 * @restrict EA
 *
 * @description
 * The `topMenu` directive has no documentation right now
 */
theWaysApp.directive('topMenu', [function() {
  return {       
    restrict: 'E',
    transclude: true,
    controller: ['$element', function($element) {
      var element = $element[0];
      var contents = null;
      var handle = null;
      var bg = null;
      var menuOpen = false;
      var originalTranslation = 0;
      var transition;
      var speed = 200;
      // check browser capabilities
      var browser = {
        touch: ('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch,
      };

      function elemHeight(elem) {
        return elem ? elem.offsetHeight : 0;
      }
      function menuHeight() {
        return elemHeight(contents) + elemHeight(handle);
      }
      function menuOpenPos() {
        return elemHeight(contents);
      }
      function menuClosedPos() {
        return 0;
      }
      var eventHandler = {
        handleEvent: function(event) {
          if(event.type == 'mousedown' || event.type == 'mouseup' || event.type == 'mousemove') {
            event.touches = [{
              pageX: event.pageX,
              pageY: event.pageY
            }];
          }

          switch (event.type) {
            case 'mousedown': this.start(event); break;
            case 'touchstart': this.start(event); break;
            case 'touchmove': this.touchmove(event); break;
            case 'mousemove': this.touchmove(event); break;
            case 'touchend': this.end(event); break;
            case 'mouseup': this.end(event); break;
            case 'webkitTransitionEnd':
            case 'msTransitionEnd':
            case 'transitionend': this.transitionEnd(event); break;
          }
          event.preventDefault();
        },
        start: function(event) {
          var touches = event.touches[0];

          // measure start values
          transition = {
            // get initial touch coords
            startY: touches.pageY,
            deltaY: 0,
            maxAbsDeltaY: 0,
            // store time to determine touch duration
            startTime: +new Date(),
            maxDelta: menuOpenPos()-originalTranslation, //originalTranslation + deltaY = menuOpenPos()
            minDelta: menuClosedPos()-originalTranslation //originalTranslation + deltaY = menuClosedPos()
          };

          // attach touchmove and touchend listeners
          if(browser.touch) {
            document.addEventListener('touchmove', this, false);
            document.addEventListener('touchend', this, false);
          } else {
            document.addEventListener('mousemove', this, false);
            document.addEventListener('mouseup', this, false);
          }
        },
        touchmove: function(event) {

          // ensure swiping with one touch and not pinching
          if (event.touches.length > 1 ||
              event.scale && event.scale !== 1) {
            return;
          }

          // measure change in y
          var deltaY = event.touches[0].pageY - transition.startY;

          transition.deltaY = deltaY;
          //If opening menu and going over apply resistance
          if (deltaY > transition.maxDelta) {
            transition.deltaY = deltaY / (1 + Math.abs(deltaY-transition.maxDelta)/menuHeight(contents));
          }
          //If closing menu and going over apply resistance
          if (deltaY < transition.minDelta) {
            transition.deltaY = transition.minDelta;
          }
          transition.maxAbsDeltaY = Math.max(transition.maxAbsDeltaY, Math.abs(transition.deltaY));

          moveMenu(originalTranslation+transition.deltaY, 0);
        },
        end: function(event) {
          // measure duration
          var duration = +new Date() - transition.startTime;

          // determine if slide attempt triggers next/prev slide
          var isClick =
                Number(duration) < 250 &&
                transition.maxAbsDeltaY < 20;

          if (isClick) {
            menuOpen = !menuOpen;
          } else {
            var changesState = Math.abs(transition.deltaY) > elemHeight(contents)/3;

            if (changesState) {
              // determine direction of swipe
              menuOpen = transition.deltaY > 0;
            }
          }
          originalTranslation = menuOpen ? menuOpenPos() : menuClosedPos();
          moveMenu(originalTranslation, speed);

          // kill touchmove and touchend event listeners until touchstart called again
          if(browser.touch) {
            document.removeEventListener('touchmove', eventHandler, false);
            document.removeEventListener('touchend', eventHandler, false);
          } else {
            document.removeEventListener('mousemove', eventHandler, false);
            document.removeEventListener('mouseup', eventHandler, false);
          }

        },
        transitionEnd: function(event) {
          transition = false;
        }
      };
      function translate(elem, dist, speed) {
        if (!elem) return;
        var style = elem.style;

        style.webkitTransitionDuration =
        style.MozTransitionDuration =
        style.msTransitionDuration =
        style.OTransitionDuration =
        style.transitionDuration = speed + 'ms';

        style.webkitTransform = 'translate(0,' + dist + 'px)' + 'translateZ(0)';
        style.msTransform =
        style.MozTransform =
        style.OTransform = 'translateY(' + dist + 'px)';

      }
      function moveMenu(pos, speed) {
        speed = speed || 0;
        translate(contents, pos, speed);
        translate(handle, pos, speed);
        translate(bg, pos-elemHeight(contents), speed);
      }
      this.registerContents = function(elem) {
        contents = elem;
      };
      this.registerHandle = function(elem) {
        handle = elem;
      };
      this.registerBg = function(elem) {
        bg = elem;
      };
      element.addEventListener("mousedown", eventHandler);
      element.addEventListener("touchstart", eventHandler);
    }],
    link: function postLink(scope, element, attrs, ctrl, transcludeFn) {
      transcludeFn(scope, function(cloned) {
        element.append(cloned);
      });
      var bg = angular.element("<div class='blackground'></div>");
      element.append(bg);
      var styles = bg[0].style;
      styles.position = "absolute";
      styles.bottom = "100%";
      styles.width = "100%";
      styles.height = 1000+"px";
      ctrl.registerBg(bg[0]);
    }
  };
}]);
theWaysApp.directive('topMenuContent', [function() {
  return {
    restrict: 'ACE',
    require: '^topMenu',
    link: function postLink(scope, element, attrs, topMenuController) {
      var styles = element[0].style;
      styles.position = "absolute";
      styles.bottom = "100%";
      topMenuController.registerContents(element[0]);
      
      //Prevent menu items from starting slides and stuff
      element.on("mousedown touchstart", function(event) {
        var source = event.target || event.srcElement;
        if (source !== element[0]) {
          event.stopPropagation();
        }
      });
    }
  };
}]);
theWaysApp.directive('topMenuHandle', [function() {
  return {
    restrict: 'ACE',
    require: '^topMenu',
    link: function postLink(scope, element, attrs, topMenuController) {
      topMenuController.registerHandle(element[0]);
    }
  };
}]);
