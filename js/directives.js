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
theWaysApp.directive('grayscale', function() {
  return (function(styles) {
    var grayScaleOptions = {
      streetViewControl: false,
      mapTypeControl: false, 
      styles: styles
    }

    return {       
      require: 'googleMap',
      restrict: 'A', 
      priority: 1000,
      link: function postLink(originalScope, iElement, iAttrs, mapController) {
          mapController.getMap().setOptions(grayScaleOptions);
      }
    };
  })([
    {
      "featureType": "landscape",
        "stylers": [
            { "saturation": -100 }, { "lightness": 65 }, { "visibility": "on" }
        ]
    }, {
        "featureType": "poi",
        "stylers": [ 
            { "visibility": "off" }
        ]
    }, {
        "featureType": "road.highway",
        "stylers": [
            { "saturation": -100 }, { "visibility": "simplified" }
        ]
    }, {
        "featureType": "road.arterial",
        "stylers": [
            { "saturation": -100 }, { "lightness": 30 }, { "visibility": "on" }
        ]
    }, {
        "featureType": "road.local",
        "stylers": [
            { "saturation": -100 }, { "lightness": 40 }, { "visibility": "on" }
        ]
    }, {
        "featureType": "transit",
        "stylers": [
            { "saturation": -100 }, { "visibility": "simplified" }
        ]
    }, {
        "featureType": "administrative.province",
        "stylers": [
            { "visibility": "off" }
        ]
    }, {
        "featureType": "water",
        "elementType": "labels",
        "stylers": [
            { "visibility": "on" }, { "lightness": -25 }, { "saturation": -100 }
        ]
    }, {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
            { "hue": "#ffff00" }, { "lightness": -25 }, { "saturation": -97 }
        ]
    }
  ]);
});
