angular.module("ParseServices",[]).factory("ParseSDK",["$rootScope",function(a){function b(a){var b=_.clone(a.attributes);return b.id=a.id,b}Parse.initialize("sSbouZ9V8HOSQY755wkzfMSYE5zmqe1nBzUd7Npc","DMcQVzpWOusZPNTuXzbMMTUKskvpzaFWLgSj7ump");var c=Parse.Object.extend("way"),d=Parse.Collection.extend({model:c}),e=new d;return{getWays:function(c,d,f,g){e.fetch({success:function(c){var d=_.map(c.models,b);f(d),a.$apply()},error:function(a,b){g(b)}})},getWay:function(d,e,f){var g=new Parse.Query(c);g.get(d,{success:function(c){e(b(c)),a.$apply()},error:function(a,b){f(b)}})},saveWay:function(a,b){var d=new c;d.save(a,{success:b})},saveWays:function(a){angular.forEach(a,function(a){var b=new c;b.save(a,{})})}}}]);var theWaysApp=angular.module("theways",["ngAnimate","ngTouch","ui.router","google-maps","ParseServices"]);theWaysApp.config(["$stateProvider","$urlRouterProvider",function(a,b){b.otherwise("/splash"),a.state("splash",{url:"/splash",templateUrl:"partials/splash.html"}).state("ways",{"abstract":!0,url:"/ways",templateUrl:"partials/wayslayout.html"}).state("ways.map",{url:"/map",data:{position:"top"}}).state("ways.list",{url:"/list",data:{position:"bottom"}}).state("ways.map.way",{url:"/way/:wayId",data:{position:"top",details:!0},views:{"details@ways":{controller:"WayController",templateUrl:"partials/ways.details.html"}}}).state("ways.list.way",{url:"/way/:wayId",data:{position:"bottom",details:!0},views:{"details@ways":{controller:"WayController",templateUrl:"partials/ways.details.html"}}})}]).run(["$rootScope","$state",function(a,b){a.goUp=function(){b.go("^")},a.viewClasses=[],a.$on("$stateChangeStart",function(b,c){var d=[];c.data&&(c.data.position&&d.push("position-"+c.data.position),c.data.details&&d.push("show-details")),a.viewClasses=d})}]).directive("uiView",function(){return{link:function(a,b){b.toggleClass("empty-view",0===b.children().length)}}}),theWaysApp.controller("WayListController",["$scope","$state","WaysService",function(a,b,c){a.gotoWay=function(a){b.go("ways.list.way",{wayId:a.id})},c.getWays({},"",function(b){a.ways=b})}]),theWaysApp.controller("MapController",["$scope","$state","WaysService",function(a,b,c){a.map={center:{latitude:60.166667,longitude:24.933333},zoom:16},a.gotoWay=function(a){b.go("ways.map.way",{wayId:a.id})},c.getWays({},"",function(b){a.wayMarkers=b})}]),theWaysApp.controller("WayController",["$scope","$state","WaysService",function(a,b,c){c.getWay(b.params.wayId,function(b){a.way=b,a.mapCenter=_.clone(b.position)})}]),theWaysApp.directive("way",function(){return{restrict:"E",scope:{name:"="},template:"<div class='way'><div class='way-name'>{{name}}</div><div class='way-logo'><span class='ways-w'>W</span><span class='ways-a'>A</span><span class='ways-y'>Y</span></div></div>",link:function(a,b,c){c.size&&b.children("div").addClass(c.size)}}}),theWaysApp.directive("grayscale",function(){return function(a){var b={streetViewControl:!1,mapTypeControl:!1,styles:a};return{require:"googleMap",restrict:"A",priority:1e3,link:function(a,c,d,e){var f=e.getMap();f&&f.setOptions(b)}}}([{featureType:"landscape",stylers:[{saturation:-100},{lightness:65},{visibility:"on"}]},{featureType:"poi",stylers:[{visibility:"off"}]},{featureType:"road.highway",stylers:[{saturation:-100},{visibility:"simplified"}]},{featureType:"road.arterial",stylers:[{saturation:-100},{lightness:30},{visibility:"on"}]},{featureType:"road.local",stylers:[{saturation:-100},{lightness:40},{visibility:"on"}]},{featureType:"transit",stylers:[{saturation:-100},{visibility:"simplified"}]},{featureType:"administrative.province",stylers:[{visibility:"off"}]},{featureType:"water",elementType:"labels",stylers:[{visibility:"on"},{lightness:-25},{saturation:-100}]},{featureType:"water",elementType:"geometry",stylers:[{hue:"#ffff00"},{lightness:-25},{saturation:-97}]}])}),theWaysApp.service("WaysService",["ParseSDK",function(a){this.getWays=function(b,c,d){a.getWays(b,c,d,function(){})},this.getWay=function(b,c){a.getWay(b,c,function(){})}}]),theWaysApp.service("BackgroundService",function(){});
//# sourceMappingURL=scripts.js.map