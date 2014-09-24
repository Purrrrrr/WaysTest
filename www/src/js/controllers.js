theWaysApp.controller('DistrictsController', 
       ['$scope', '$state',
function($scope, $state) {
  
  //Helper function to make click handlers
  function goTo(state, params) {
    return function() {
      $state.go(state, params);
    };
  }

  //Temporary list of districts by name. These should come from the backend
  var districtNames = ["Eira", "Punavuori", "Kallio", "Hakaniemi", "Vallila", "Arabia", "Töölö", "Kluuvi", "Katajanokka", "Kaivopuisto", "Suvilahti", "Ruoholahti", "Vanhakaupunki"];
  //Make the list longer for testing
  districtNames.push.apply(districtNames, districtNames);
  districtNames.push.apply(districtNames, districtNames);

  var districts = _.map(districtNames, function(name) {
    //We want them to be objects
    return {
      click: goTo('districts.list', {districtId: name}),
      classes: [],
      name: name 
    }; 
  });

  var randomButton = {
    click: goTo('districts.randomway'),
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
}]);
theWaysApp.controller('WayListController', 
       ['$scope', '$state', 'WaysService', '$q',
function($scope,   $state,   WaysService, $q) {
  var districtId = $state.params.districtId;

  $scope.district = {
    name: districtId
  };
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
