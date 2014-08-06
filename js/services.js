theWaysApp.service('WaysService', function(ParseSDK) {
  // TODO: Some caching system could be nice  
 
  this.getWays = function(position, search, successFunc) {
    ParseSDK.getWays(position, search, successFunc, function() {});
  }
  this.getWay = function(id, successFunc) {
    ParseSDK.getWay(id, successFunc, function() {});
  }
  
  /*
  //Calculates the distance between to points
  var R = 6371; // km
  var φ1 = lat1.toRadians();
  var φ2 = lat2.toRadians();
  var Δφ = (lat2-lat1).toRadians();
  var Δλ = (lon2-lon1).toRadians();

  var a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
  Math.cos(φ1) * Math.cos(φ2) *
  Math.sin(Δλ/2) * Math.sin(Δλ/2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

  var d = R * c;
  */
});
theWaysApp.service('BackgroundService', function() {

});
