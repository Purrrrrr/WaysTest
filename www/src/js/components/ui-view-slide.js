/**
 * @ngdoc directive
 * @name uiViewSlide
 * @restrict A
 *
 * @description
 * The `uiViewSlide` directive links an ionSlide element to a uiView
 * so that state changes show and hide the slides corresponding
 * to the used and unused views.
 *
 * The linking also changes to the corresponding state when 
 * a slide containing a view from that state is activated.
 *
 * This can be used to build a slidable navigation pane for
 * a group of states.
 *
 * @param {string} uiViewSlide The name to give to the contained uiView directive.
 */
theWaysApp.directive('uiViewSlide', ['$rootScope', '$state', '$timeout', '$compile', function($rootScope, $state, $timeout, $compile) {
  
  //Enumerate through all the states to get a map of them
  var states = {};
  angular.forEach($state.get(), function(state) {
    states[state.name] = state;
  });

  function parentName(name) {
    return name.split(".").slice(0,-1).join(".");
  }
  function getStateViewNames(stateName) {
    var names = {};
    var state = states[stateName];
    if (state.views) {
      angular.forEach(state.views, function(view, viewName) {
        if (viewName.indexOf("@") === -1) {
          viewName = viewName+"@"+parentName(stateName);
        }
        names[viewName] = true;
      });
    } else {
      names["@"+stateName] = true;
    }
    return names;
  }

  return {
    restrict: 'A', 
    transclude: 'element',
    require: ['^ionSlideBox'],
    priority: 600,
    link: function(scope, element, attrs, slideBox, transcludeFn) {
      var name = attrs.uiViewSlide; 
      var slider = slideBox[0].__slider;
      var contentBlock;
      ss = slider;
      
      function getViewName() {
        //Duplicate some of uiView functionality
        var name = attrs.uiViewSlide || '';
        var inherited = element.parent().inheritedData('$uiView');
        var parentState =  (inherited ? inherited.state.name : '');
        if (name.indexOf('@') < 0) { 
          name = name + "@" + parentState;
        }
        return name; 
      }
      function isViewActive(stateName, scanParents) {
        do {
          var stateViews = getStateViewNames(stateName);
          var name = getViewName();
          if (stateViews[name]) {
            return true;
          }
          stateName = parentName(stateName);
        } while (stateName !== '' && scanParents);
        return false;
      }
      function getSlideNum() {
        return _.indexOf(element.parent().children(), contentBlock[0]);
      }
      function switchToThis() {
        slider.slide(getSlideNum());
      }
      
      //The function that generates and destroys the slides and views
      function updateStatus(newState) {
        //console.log(newState);
        if (isViewActive(newState, true)) {
          //console.log("active in "+getViewName());
          if (!contentBlock) {
            transcludeFn(scope, function(clone) {
              var viewScope = scope.$new();
              contentBlock = clone;
              element.after(clone);
              $compile('<div ui-view="'+name+'"></div>')(viewScope, function(viewElem, viewScope) {
                clone.append(viewElem);
              });
              slider.update();
            });
          }
        } else {
          //console.log("inactive in "+getViewName());
          if (contentBlock) {
            //TODO: remove blocks and update slider after animation 
            $timeout(function() { 
              contentBlock.remove();
              contentBlock = null;
              slider.update();
            }, 410);
          }
        }
      }

      $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams) {
        updateStatus(toState.name);
      });
      $rootScope.$on("$stateChangeSuccess", function (event, toState) {
        //If the attached view is the main one, slide to this slide
        if (isViewActive(toState.name, false)) {
          $timeout(switchToThis, 100);
        }
      });
      updateStatus($state.current.name);
      if (isViewActive($state.current.name, false)) {
        $timeout(switchToThis, 10);
      }
      scope.$on("slideBox.slideChanged", function (event, d) {
        if (contentBlock && slider.currentIndex() == getSlideNum()) {
          var viewData = contentBlock.children().data('$uiView');
          var viewState = viewData && viewData.state && viewData.state.self.name;
          //console.log(viewData);
          if (viewState && viewState != $state.current.name) {
            $state.go(viewState, viewData.state.params);
          }
        }
      });
    }
  };
}]);
