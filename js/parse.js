angular.module('ParseServices', [])
.factory('ParseSDK', ['$q', function($q) {

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
  var allWays = new WayCollection();
  
  return {
    getWays: function(position, search, successFunc, errFunc) {
      var deferred = $q.defer();
      var promise = deferred.promise;

      //The parameters are ignored for now
      allWays.fetch({
        success: function(coll) {
          var objs = [];
          angular.forEach(coll.models, function(row) {
            var obj = _.clone(row.attributes);
            obj.id = row.id;
            objs.push(obj);
          });
          //console.log(objs);
          promise.then(function(objs) {
            successFunc(objs)
          });
          deferred.resolve(objs);
        }
      });
    },
    getWay: function(id) {
      //_.clone(model.attributes)
    },
    saveWay: function(data, successFunc) {
      var way = new Way()
      way.save(data, {success: successFunc});
    },
    saveWays: function(ways, successFunc) {
      ////console.log(allWays);
      //allWays.remove(allWays);
      angular.forEach(ways, function(data) {
        var way = new Way()
        way.save(data, {});
      });
      //console.log(allWays);
    }
  }

}]);
