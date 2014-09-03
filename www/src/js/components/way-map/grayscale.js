/** Implements the grayscale coloring of the ways map */
theWaysApp.directive('grayscale', function() {
  return (function(styles) {
    var grayScaleOptions = {
      streetViewControl: false,
      mapTypeControl: false, 
      styles: styles
    };

    return {       
      require: 'googleMap',
      restrict: 'A', 
      priority: 1000,
      link: function postLink(originalScope, iElement, iAttrs, mapController) {
        var map = mapController.getMap();
        if (!map) return;
        map.setOptions(grayScaleOptions);
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
