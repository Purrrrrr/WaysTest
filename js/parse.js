angular.module('ParseServices', [])
.factory('ParseSDK', [function() {

  Parse.initialize("sSbouZ9V8HOSQY755wkzfMSYE5zmqe1nBzUd7Npc", "DMcQVzpWOusZPNTuXzbMMTUKskvpzaFWLgSj7ump");

  // FACEBOOK init
  /*
  window.fbPromise.then(function() {

    Parse.FacebookUtils.init({

      appId: 481650395275919, // Facebook App ID
      channelUrl: 'http://brandid.github.io/parse-angular-demo/channel.html', // Channel File
      cookie: true, // enable cookies to allow Parse to access the session
      xfbml: true, // parse XFBML
      frictionlessRequests: true // recommended

    });

  }); */

  var Way = Parse.Object.extend("way");
  var WayCollection = Parse.Collection.extend({
    model: Way
  });
  
  return {
    getWays: function(position, search, successFunc, errFunc) {
      //The parameters are ignored for now
      WayCollection.fetch(function(coll) {
        console.log(coll);
        successFunc(coll);
      });
    },
    getWay: function(id) {
      //_.clone(model.attributes)
    },
    saveWay: function(way, successFunc) {
      Way.save(way, successFunc);
    }
  }

}]);
