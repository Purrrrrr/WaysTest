theWaysApp.controller('DistrictsController',
       ['$scope', '$state', '$cordovaGeolocation',
function($scope, $state, $cordovaGeolocation) {

  //Helper function to make click handlers
  function goTo(state, params) {
    return function() {
      $state.go(state, params);
    };
  }


  $cordovaGeolocation
  .getCurrentPosition()
  .then(function (position) {
    $scope.lat  = position.coords.latitude;
    $scope.longi = position.coords.longitude;
  }, function(err) {
    // error

  });


    // begin watching
  var watch = $cordovaGeolocation.watchPosition({ frequency: 1000 });
  watch.promise.then(function() { /* Not  used */ },
    function(err) {
      // An error occurred.
    },
    function(position) {
      // Active updates of the position here
      // position.coords.[ latitude / longitude]
      $scope.position = position.coords.latitude;
  });

  // clear watch
  $cordovaGeolocation.clearWatch(watch.watchID);

  // example distance formula:

 /*   var R = 6371; // km
    var φ1 = lat1.toRadians();
    var φ2 = lat2.toRadians();
    var Δφ = (lat2-lat1).toRadians();
    var Δλ = (lon2-lon1).toRadians();

    var a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ/2) * Math.sin(Δλ/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    var d = R * c; */

    // calc distance

    function distance(lat1, lat2, lon1, lon2) {
        var R = 9371; //km
        var φ1 = lat1.toRadians();
        var φ2 = lat2.toRadians();
        var Δφ = (lat2-lat1).toRadians();
        var Δλ = (lon2-lon1).toRadians();

        var a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ/2) * Math.sin(Δλ/2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

        var d = R * c;
        return d;
    };


  //Temporary list of districts by name. These should come from the backend
  var districtLoc = [
  {name: 'Eira', lat: '60.156764', longitude: '24.937565'},
  {name: 'Punavuori'},
  {name: 'Kallio'},
  {name: 'Hakaniemi'},
  {name: 'Vallila'},
  {name: 'Arabia'},
  {name: 'Töölö'},
  {name: 'Kluuvi'},
  {name: 'Katajanokka'},
  {name: 'Kaivopuisto'},
  {name: 'Suvilahti'},
  {name: 'Ruoholahti'},
  {name: 'Vanhakaupunki'}
  ];
  //Make the list longer for testing
  districtLoc.push.apply(districtLoc, districtLoc);
  districtLoc.push.apply(districtLoc, districtLoc);

  var districts = _.map(districtLoc, function(district) {
    //We want them to be objects
    return {
      click: goTo('districts.list', {districtId: district.name}),
      classes: [],
      name: district.name
    };
  });

  var randomButton = {
    click: goTo('districts.randomWay'),
    specialClass: "random",
    name: "Random"
  };
  var closestButton = {
    click: goTo('districts.list', {districtId: "closest"}),
    specialClass: "closest",
    name: "Closest"
  };

  //Insert the random and closest district buttons to the list
  districts.splice(1, 0, randomButton);
  districts.splice(4, 0, closestButton);

  //Define how many large blocks to overlay between smaller ones
  //Currently uses 2 or 3 randomly
  function randomInterval() { return _.random(2,3); }
  var largeDistrictsBetweenSmallerOnes = _.times(districts.length >> 1, randomInterval); // length >> 1 == Math.floor(length/2)

  var districtsToNextSmallBlock = 1;
  for(var i = districtsToNextSmallBlock; i+1 < districts.length; i++) {
    districts[i].size = "small";
    i++;
    districts[i].size = "small";
    i += largeDistrictsBetweenSmallerOnes.pop();
  }

  //Do the coloring
  //Define the colors
  var colors = ["red", "yellow", "green", "transparent"];
  var used = [];
  for(i = 0; i < districts.length; i++) {
    var district = districts[i];
    var currentColor;

    if (district.specialClass) {
      currentColor = "transparent";
    } else {
      currentColor = colors.shift();
    }

    if (colors.length > 0) {
      colors = _.without(colors, currentColor);
      used = _.union(used, [currentColor]);
    } else {
      var previousColor = districts[i-1].color;
      var usable = _.without(used, previousColor);

      colors = _.shuffle(usable);
      used = [currentColor, previousColor];
    }

    district.color = currentColor;
  }

  $scope.districts = districts;
  $scope.distanceEira = distance('60.156764', $scope.lat, '24.937565', $scope.longi);
}]);
theWaysApp.controller('WayListController',
       ['$scope', '$state', 'WaysService', '$q', '$cordovaGeolocation',
function($scope,   $state,   WaysService, $q, $cordovaGeolocation) {
  var districtId = $state.params.districtId;

  $scope.district = {
    name: districtId
  };

  $cordovaGeolocation
  .getCurrentPosition()
  .then(function (position) {
    $scope.lat  = position.coords.latitude;
    $scope.long = position.coords.longitude;
  }, function(err) {
    // error

  });

  $scope.loadWays = function() {
    // TODO: Real coupling with districts
    /*
    if (!districtId) {
      return
    } */
    return WaysService.getWays({});
  };

}]);
theWaysApp.controller('WayController',
       ['$scope', 'wayData',
function($scope, wayData) {
  $scope.loadWay = function() {
    return wayData.loader.then(function(way) {
      $scope.mapCenter = _.clone(way.position);
      return way;
    });
  };
}]);
theWaysApp.controller('WayDetailController',
       ['$scope', 'wayData',
function($scope, wayData) {
  $scope.loadWay = function() {
    return wayData.loader.then(function(way) {
      $scope.mapCenter = _.clone(way.position);
      return way;
    });
  };
}]);
