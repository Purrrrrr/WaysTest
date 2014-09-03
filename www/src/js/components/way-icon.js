theWaysApp.directive('way', function() {
  return {       
    restrict: 'E', 
    scope: {
      name: "="
    },
    template: "<div class='way'>"+
    "<div class='way-name'>{{name}}</div>"+
    "<div class='way-logo'><span class='ways-w'>W</span><span class='ways-a'>A</span><span class='ways-y'>Y</span></div></div>",
    link: function postLink(scope, iElement, iAttrs) {
      if (iAttrs.size) {
        iElement.children("div").addClass(iAttrs.size);
      }
    }
  };
});
