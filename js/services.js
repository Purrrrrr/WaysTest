theWaysApp.service('WaysService', function($q) {
  
  this.getWays = function(position, search, successFunc) {
    var wayNames = ["friends", "revolution", "pool", "latte", "random"];
    var places = ["Good life", "Kaiku", "Bar Chaplin", "Random club", "Cafe This", "Cafe That", "Siltanen", "Place X"];
    var ways = [];

    for(var i = 0; i < 10; i++) {
      var dx = _.random(100)-50;
      var dy = _.random(100)-50;
      var way = {
        id: i,
        position: {
          latitude: 60.166667 + dx/10000,
          longitude: 24.933333 + dy/10000
        },
        distance: _.random(1,70)*10,
        name: _.shuffle(wayNames)[0],
        place: _.shuffle(places)[0]
      }
      ways.push(way);
    }

    successFunc(ways); 
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
