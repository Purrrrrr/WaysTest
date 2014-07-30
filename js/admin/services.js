adminApp.service('MockWays', function(ParseSDK) {
  
  this.getWays = function() {
    var wayNames = ["friends", "revolution", "pool", "latte", "random"];
    var places = ["Good life", "Kaiku", "Bar Chaplin", "Random club", "Cafe This", "Cafe That", "Siltanen", "Place X"];
    var ways = [];
    var currentDate = new Date();

    for(var i = 0; i < 10; i++) {
      var dx = _.random(100)-50;
      var dy = _.random(100)-50;
      var way = {
        //id: i,
        position: {
          latitude: 60.166667 + dx/10000,
          longitude: 24.933333 + dy/10000
        },
        distance: _.random(1,70)*10,
        name: _.shuffle(wayNames)[0],
        description: 'Do some stuff with friends.',
        details: 'Name drop it to get it. Lorem ipsum WAY dolor set amet.',
        place: _.shuffle(places)[0],
        placeDetails: 'Lorem ipsum beer dolor whiskey set amet.',
        endTime: new Date(currentDate.getTime() + (_.random(15,125)*60*1000))
      }
      ways.push(way);
    }

    return ways; 
  }
  
});
